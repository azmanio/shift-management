<template>
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg mb-4">Tambah Kehadiran Baru</h3>

			<div class="form-control">
				<label class="label">ID Pegawai</label>
				<select v-model="employee_id" class="select select-bordered">
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

			<div class="form-control">
				<label class="label">ID Shift</label>
				<select v-model="shift_id" class="select select-bordered">
					<option disabled value="">Pilih Shift</option>
					<option v-for="shift in shifts" :key="shift.id" :value="shift.id">
						{{ shift.shift_name }} - {{ shift.shift_date }}
					</option>
				</select>
			</div>

			<div class="form-control">
				<label class="label">Status</label>
				<select v-model="status" class="select select-bordered">
					<option value="present">Hadir</option>
					<option value="absent">Tidak Hadir</option>
					<option value="late">Terlambat</option>
				</select>
			</div>

			<div class="modal-action">
				<button class="btn btn-primary" @click="createAttendance">
					Simpan
				</button>
				<button class="btn" @click="$emit('close')">Batal</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAttendanceStore } from "../stores/attendanceStore";
import { useEmployeeStore } from "../stores/employeeStore";
import { useShiftStore } from "../stores/shiftStore";

const attendanceStore = useAttendanceStore();
const employeeStore = useEmployeeStore();
const shiftStore = useShiftStore();

const employee_id = ref("");
const shift_id = ref("");
const status = ref("present");
const employees = ref([]);
const shifts = ref([]);

const createAttendance = async () => {
	await attendanceStore.createAttendance({
		employee_id: employee_id.value,
		shift_id: shift_id.value,
		status: status.value,
	});
	$emit("close");
};

onMounted(async () => {
	await employeeStore.fetchEmployees();
	await shiftStore.fetchShifts();
	employees.value = employeeStore.employees;
	shifts.value = shiftStore.shifts;
});
</script>
