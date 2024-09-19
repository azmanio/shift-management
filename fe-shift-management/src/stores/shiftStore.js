import { defineStore } from "pinia";
import api from "../api";

export const useShiftStore = defineStore("shift", {
	state: () => ({
		shifts: [],
	}),

	actions: {
		async fetchShifts() {
			try {
				const response = await api.get("/shifts");
				this.shifts = response.data;
			} catch (error) {
				console.error("Gagal mengambil data shift", error);
			}
		},

		async createShift(shiftData) {
			try {
				const response = await api.post("/shifts", shiftData);
				this.shifts.push(response.data);
			} catch (error) {
				console.error("Gagal menambahkan shift", error);
			}
		},

		async updateShift(id, shiftData) {
			try {
				const response = await api.put(`/shifts/${id}`, shiftData);
				const index = this.shifts.findIndex((shift) => shift.id === id);
				if (index !== -1) {
					this.shifts[index] = response.data;
				}
			} catch (error) {
				console.error("Gagal memperbarui shift", error);
			}
		},

		async deleteShift(id) {
			try {
				await api.delete(`/shifts/${id}`);
				this.shifts = this.shifts.filter((shift) => shift.id !== id);
			} catch (error) {
				console.error("Gagal menghapus shift", error);
			}
		},
	},
});
