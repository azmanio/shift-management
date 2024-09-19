<template>
	<div class="p-6">
		<h2 class="text-2xl font-bold mb-4">Manajemen Pegawai</h2>
		<button class="btn btn-sm btn-primary mb-4" @click="openCreateModal">
			Tambah Pegawai
		</button>

		<div class="overflow-x-auto mt-5 text-center">
			<table class="min-w-full border-collapse border border-gray-200">
				<thead class="bg-gray-800">
					<tr>
						<th class="border px-4 py-2">No</th>
						<th class="border px-4 py-2">ID Pegawai</th>
						<th class="border px-4 py-2">Nama</th>
						<th class="border px-4 py-2">Departemen</th>
						<th class="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(employee, index) in employees"
						:key="employee.id"
						class="hover:bg-gray-600"
					>
						<td class="border px-4 py-2">{{ index + 1 }}</td>
						<td class="border px-4 py-2">{{ employee.employee_id }}</td>
						<td class="border px-4 py-2">{{ employee.name }}</td>
						<td class="border px-4 py-2">{{ employee.department }}</td>
						<td class="border px-4 py-2">
							<button
								class="btn btn-sm btn-secondary mr-2"
								@click="openEditModal(employee)"
							>
								Edit
							</button>
							<button
								class="btn btn-sm btn-error"
								@click="deleteEmployee(employee.id)"
							>
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<CreateEmployeeModal
			v-if="showCreateModal"
			@close="handleCloseCreateModal"
		/>

		<EditEmployeeModal
			v-if="showEditModal"
			:employee="selectedEmployee"
			@close="handleCloseEditModal"
		/>

		<Alert v-if="alertMessage" :type="alertType" :message="alertMessage" />
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";
import CreateEmployeeModal from "../components/CreateEmployeeModal.vue";
import EditEmployeeModal from "../components/EditEmployeeModal.vue";
import Alert from "../components/Alert.vue"; // Pastikan import komponen Alert

const employeeStore = useEmployeeStore();
const employees = ref([]);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedEmployee = ref(null);
const alertMessage = ref("");
const alertType = ref("");

const fetchEmployees = async () => {
	await employeeStore.fetchEmployees();
	employees.value = employeeStore.employees;
};

const openCreateModal = () => {
	showCreateModal.value = true;
};

const handleCloseCreateModal = async () => {
	showCreateModal.value = false;
	await fetchEmployees();
	alertMessage.value = "Pegawai baru berhasil ditambahkan!";
	alertType.value = "success";
	clearAlert();
};

const openEditModal = (employee) => {
	selectedEmployee.value = employee;
	showEditModal.value = true;
};

const handleCloseEditModal = async () => {
	showEditModal.value = false;
	await fetchEmployees();
	alertMessage.value = "Data pegawai berhasil diperbarui!";
	alertType.value = "success";
	clearAlert();
};

const deleteEmployee = async (id) => {
	await employeeStore.deleteEmployee(id);
	await fetchEmployees();
	alertMessage.value = "Pegawai berhasil dihapus!";
	alertType.value = "error";
	clearAlert();
};

const clearAlert = () => {
	setTimeout(() => {
		alertMessage.value = "";
		alertType.value = "";
	}, 3000);
};

onMounted(() => {
	fetchEmployees();
});
</script>
