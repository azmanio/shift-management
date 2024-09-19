import { defineStore } from "pinia";
import api from "../api";

export const useAttendanceStore = defineStore("attendance", {
	state: () => ({
		attendances: [],
	}),
	actions: {
		async fetchAttendances() {
			try {
				const response = await api.get("/attendances");
				this.attendances = response.data;
			} catch (error) {
				console.error("Gagal mengambil data kehadiran", error);
			}
		},
		async createAttendance(attendanceData) {
			try {
				const response = await api.post("/attendances", attendanceData);
				this.attendances.push(response.data);
			} catch (error) {
				console.error("Gagal menambahkan kehadiran", error);
			}
		},
		async deleteAttendance(id) {
			try {
				await api.delete(`/attendances/${id}`);
				this.attendances = this.attendances.filter(
					(attendance) => attendance.id !== id
				);
			} catch (error) {
				console.error("Gagal menghapus kehadiran", error);
			}
		},
	},
});
