<template>
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg mb-4">Edit Pegawai</h3>

			<div class="form-control">
				<label class="label">ID Pegawai</label>
				<input
					type="text"
					v-model="employee.employee_id"
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label class="label">Nama</label>
				<input
					type="text"
					v-model="employee.name"
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label class="label">Departemen</label>
				<input
					type="text"
					v-model="employee.department"
					class="input input-bordered"
				/>
			</div>

			<div class="modal-action">
				<button class="btn btn-primary" @click="editEmployee">Simpan</button>
				<button class="btn" @click="$emit('close')">Batal</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";

const emit = defineEmits();
const employeeStore = useEmployeeStore();
const props = defineProps(["employee"]);

const editEmployee = async () => {
	await employeeStore.updateEmployee({
		id: props.employee.id,
		name: props.employee.name,
		employee_id: props.employee.employee_id,
		department: props.employee.department,
	});
	emit("close");
};
</script>
