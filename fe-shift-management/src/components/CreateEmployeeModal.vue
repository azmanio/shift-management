<template>
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg mb-4">Tambah Pegawai Baru</h3>

			<div class="form-control">
				<label class="label">ID Pegawai</label>
				<input type="text" v-model="employee_id" class="input input-bordered" />
			</div>

			<div class="form-control">
				<label class="label">Nama</label>
				<input type="text" v-model="name" class="input input-bordered" />
			</div>

			<div class="form-control">
				<label class="label">Departemen</label>
				<input type="text" v-model="department" class="input input-bordered" />
			</div>

			<div class="modal-action">
				<button class="btn btn-primary" @click="createEmployee">Simpan</button>
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
const name = ref("");
const employee_id = ref("");
const department = ref("");

const createEmployee = async () => {
	await employeeStore.createEmployee({
		name: name.value,
		employee_id: employee_id.value,
		department: department.value,
	});
	emit("close");
};
</script>
