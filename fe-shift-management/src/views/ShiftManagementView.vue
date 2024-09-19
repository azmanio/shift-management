<template>
	<div class="p-6">
		<h2 class="text-2xl font-bold mb-4">Manajemen Shift</h2>
		<button class="btn btn-sm btn-primary mb-4" @click="openCreateModal">
			Tambah Shift
		</button>

		<div class="overflow-x-auto mt-5 text-center">
			<table class="min-w-full border-collapse border border-gray-200">
				<thead class="bg-gray-800">
					<tr>
						<th class="border px-4 py-2">No</th>
						<th class="border px-4 py-2">Nama Shift</th>
						<th class="border px-4 py-2">Tanggal Shift</th>
						<th class="border px-4 py-2">Waktu Mulai</th>
						<th class="border px-4 py-2">Waktu Selesai</th>
						<th class="border px-4 py-2">ID Pegawai</th>
						<th class="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(shift, index) in shifts"
						:key="shift.id"
						class="hover:bg-gray-600"
					>
						<td class="border px-4 py-2">{{ index + 1 }}</td>
						<td class="border px-4 py-2">{{ shift.shift_name }}</td>
						<td class="border px-4 py-2">{{ shift.shift_date }}</td>
						<td class="border px-4 py-2">{{ shift.start_time }}</td>
						<td class="border px-4 py-2">{{ shift.end_time }}</td>
						<td class="border px-4 py-2">{{ shift.employee_id }}</td>
						<td class="border px-4 py-2">
							<button
								class="btn btn-sm btn-secondary mr-2"
								@click="openEditModal(shift)"
							>
								Edit
							</button>
							<button
								class="btn btn-sm btn-error"
								@click="deleteShift(shift.id)"
							>
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<CreateShiftModal v-if="showCreateModal" @close="handleCloseCreateModal" />
		<EditShiftModal
			v-if="showEditModal"
			:shift="selectedShift"
			@close="handleCloseEditModal"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useShiftStore } from "../stores/shiftStore";
import CreateShiftModal from "../components/CreateShiftModal.vue";
import EditShiftModal from "../components/EditShiftModal.vue";

const shiftStore = useShiftStore();
const shifts = ref([]);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedShift = ref(null);

const fetchShifts = async () => {
	await shiftStore.fetchShifts();
	shifts.value = shiftStore.shifts;
};

const openCreateModal = () => {
	showCreateModal.value = true;
};

const handleCloseCreateModal = () => {
	showCreateModal.value = false;
	fetchShifts();
};

const openEditModal = (shift) => {
	selectedShift.value = shift;
	showEditModal.value = true;
};

const handleCloseEditModal = () => {
	showEditModal.value = false;
	fetchShifts();
};

const deleteShift = async (id) => {
	await shiftStore.deleteShift(id);
	fetchShifts();
};

onMounted(() => {
	fetchShifts();
});
</script>
