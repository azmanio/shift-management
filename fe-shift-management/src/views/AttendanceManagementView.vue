<template>
	<div class="p-6">
		<h2 class="text-2xl font-bold mb-4">Manajemen Kehadiran</h2>
		<button class="btn btn-sm btn-primary mb-4" @click="openCreateModal">
			Tambah Kehadiran
		</button>

		<div class="overflow-x-auto mt-5 text-center">
			<table class="min-w-full border-collapse border border-gray-200">
				<thead class="bg-gray-800">
					<tr>
						<th class="border px-4 py-2">No</th>
						<th class="border px-4 py-2">ID Pegawai</th>
						<th class="border px-4 py-2">ID Shift</th>
						<th class="border px-4 py-2">Status</th>
						<th class="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(attendance, index) in attendances"
						:key="attendance.id"
						class="hover:bg-gray-600"
					>
						<td class="border px-4 py-2">{{ index + 1 }}</td>
						<td class="border px-4 py-2">{{ attendance.employee_id }}</td>
						<td class="border px-4 py-2">{{ attendance.shift_id }}</td>
						<td class="border px-4 py-2">{{ attendance.status }}</td>
						<td class="border px-4 py-2">
							<button
								class="btn btn-sm btn-error"
								@click="deleteAttendance(attendance.id)"
							>
								Hapus
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<CreateAttendanceModal
			v-if="showCreateModal"
			@close="handleCloseCreateModal"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAttendanceStore } from "../stores/attendanceStore";
import CreateAttendanceModal from "../components/CreateAttendanceModal.vue";

const attendanceStore = useAttendanceStore();
const attendances = ref([]);
const showCreateModal = ref(false);

const fetchAttendances = async () => {
	await attendanceStore.fetchAttendances();
	attendances.value = attendanceStore.attendances;
};

const openCreateModal = () => {
	showCreateModal.value = true;
};

const handleCloseCreateModal = () => {
	showCreateModal.value = false;
	fetchAttendances();
};

const deleteAttendance = async (id) => {
	await attendanceStore.deleteAttendance(id);
	fetchAttendances();
};

onMounted(() => {
	fetchAttendances();
});
</script>
