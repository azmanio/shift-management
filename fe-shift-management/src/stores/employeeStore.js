import { defineStore } from "pinia";
import api from "../api";

export const useEmployeeStore = defineStore("employee", {
	state: () => ({
		employees: [],
		employee: null,
	}),

	actions: {
		async fetchEmployees() {
			try {
				const response = await api.get("/employees");
				this.employees = response.data;
			} catch (error) {
				console.error("Failed to fetch employees", error);
			}
		},

		async createEmployee(employeeData) {
			try {
				const response = await api.post("/employees", employeeData);
				this.employees.push(response.data);
			} catch (error) {
				console.error("Failed to create employee", error);
			}
		},

		async updateEmployee(employeeData) {
			try {
				const response = await api.put(
					`/employees/${employeeData.id}`,
					employeeData
				);
				const index = this.employees.findIndex(
					(emp) => emp.id === employeeData.id
				);
				if (index !== -1) {
					this.employees[index] = response.data;
				}
			} catch (error) {
				console.error("Failed to update employee", error);
			}
		},

		async deleteEmployee(id) {
			try {
				await api.delete(`/employees/${id}`);
				this.employees = this.employees.filter(
					(employee) => employee.id !== id
				);
			} catch (error) {
				console.error("Failed to delete employee", error);
			}
		},
	},
});
