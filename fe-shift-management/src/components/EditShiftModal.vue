<template>
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg mb-4">Edit Shift</h3>

			<div class="form-control">
				<label class="label">Nama Shift</label>
				<input
					type="text"
					v-model="shift.shift_name"
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label class="label">Tanggal Shift</label>
				<input
					type="date"
					v-model="shift.shift_date"
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label class="label">Waktu Mulai</label>
				<input
					type="time"
					v-model="shift.start_time"
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label class="label">Waktu Selesai</label>
				<input
					type="time"
					v-model="shift.end_time"
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label class="label">ID Pegawai</label>
				<select v-model="shift.employee_id" class="select select-bordered">
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
				<button class="btn btn-primary" @click="updateShift">Simpan</button>
				<button class="btn" @click="$emit('close')">Batal</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";
import { useShiftStore } from "../stores/shiftStore";

const props = defineProps({
	shift: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["close"]);

const employeeStore = useEmployeeStore();
const shiftStore = useShiftStore();
const employees = ref([]);

const fetchEmployees = async () => {
	try {
		await employeeStore.fetchEmployees();
		employees.value = employeeStore.employees;
	} catch (error) {
		console.error("Gagal mengambil data pegawai", error);
	}
};

const shift = ref({
	shift_name: "",
	shift_date: "",
	start_time: "",
	end_time: "",
	employee_id: null,
});

// Inisialisasi shift dengan data dari props
watch(
	() => props.shift,
	(newShift) => {
		if (newShift) {
			shift.value = { ...newShift }; // Menyalin data shift yang ada
		}
	},
	{ immediate: true }
);

const updateShift = async () => {
	try {
		await shiftStore.updateShift(shift.value.id, shift.value);
		emit("close");
	} catch (error) {
		console.error("Gagal memperbarui shift", error);
	}
};

onMounted(() => {
	fetchEmployees();
});
</script>
