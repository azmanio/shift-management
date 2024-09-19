<template>
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg mb-4">Tambah Shift Baru</h3>

			<div class="form-control">
				<label class="label">Nama Shift</label>
				<input type="text" v-model="shiftName" class="input input-bordered" />
			</div>

			<div class="form-control">
				<label class="label">Tanggal Shift</label>
				<input type="date" v-model="shiftDate" class="input input-bordered" />
			</div>

			<div class="form-control">
				<label class="label">Waktu Mulai</label>
				<input type="time" v-model="startTime" class="input input-bordered" />
			</div>

			<div class="form-control">
				<label class="label">Waktu Selesai</label>
				<input type="time" v-model="endTime" class="input input-bordered" />
			</div>

			<div class="form-control">
				<label class="label">ID Pegawai</label>
				<select v-model="employeeId" class="select select-bordered">
					<option disabled value="">Pilih Pegawai</option>
					<option
						v-for="employee in employees"
						:key="employee.id"
						:value="employee.id"
					>
						{{ employee.name }}
					</option>
				</select>
			</div>

			<div class="modal-action">
				<button class="btn btn-primary" @click="createShift">Simpan</button>
				<button class="btn" @click="$emit('close')">Batal</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useShiftStore } from "../stores/shiftStore";
import { useEmployeeStore } from "../stores/employeeStore";

const emit = defineEmits();
const shiftStore = useShiftStore();
const employeeStore = useEmployeeStore();
const shiftName = ref("");
const shiftDate = ref("");
const startTime = ref("");
const endTime = ref("");
const employeeId = ref("");
const employees = ref([]);

const createShift = async () => {
	await shiftStore.createShift({
		shift_name: shiftName.value,
		shift_date: shiftDate.value,
		start_time: startTime.value,
		end_time: endTime.value,
		employee_id: employeeId.value,
	});
	emit("close");
};

const fetchEmployees = async () => {
	await employeeStore.fetchEmployees();
	employees.value = employeeStore.employees;
};

onMounted(() => {
	fetchEmployees();
});
</script>
