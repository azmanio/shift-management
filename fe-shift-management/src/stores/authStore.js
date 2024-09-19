import { defineStore } from "pinia";
import api from "../api"; // Import instance axios

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
		token: localStorage.getItem("token") || null,
		isAuthenticated: !!localStorage.getItem("token"), // Menetapkan status autentikasi awal
	}),

	actions: {
		async login(credentials) {
			try {
				const response = await api.post("/login", credentials);
				this.token = response.data.token;
				this.user = response.data.user;
				this.isAuthenticated = true;

				// Simpan token ke localStorage
				localStorage.setItem("token", this.token);
				return response.data;
			} catch (error) {
				console.error("Login failed", error);
				throw error;
			}
		},

		async logout() {
			this.token = null;
			this.user = null;
			this.isAuthenticated = false;
			localStorage.removeItem("token"); // Hapus token dari localStorage
		},

		async fetchUser() {
			if (!this.token) {
				this.isAuthenticated = false;
				return;
			}
			try {
				const response = await api.get("/me", {
					headers: {
						Authorization: `Bearer ${this.token}`, // Sertakan token di header
					},
				});
				this.user = response.data;
				this.isAuthenticated = true;
			} catch (error) {
				console.error("Failed to fetch user", error);
				this.isAuthenticated = false;
			}
		},
	},

	getters: {
		getUser() {
			return this.user;
		},
		getToken() {
			return this.token;
		},
		isLoggedIn() {
			return this.isAuthenticated;
		},
	},
});
