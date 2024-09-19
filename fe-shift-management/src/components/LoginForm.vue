<template>
	<form @submit.prevent="onSubmit">
		<div class="mb-4">
			<label class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				v-model="form.email"
				class="input input-bordered w-full"
				placeholder="Enter your email"
				required
			/>
		</div>
		<div class="mb-4">
			<label class="label">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				v-model="form.password"
				class="input input-bordered w-full"
				placeholder="Enter your password"
				required
			/>
		</div>
		<button type="submit" class="btn btn-primary w-full" :disabled="loading">
			<span v-if="loading" class="loading loading-spinner"></span>
			<span v-else>Login</span>
		</button>
	</form>
</template>

<script setup>
import { reactive, toRefs } from "vue";

const form = reactive({
	email: "",
	password: "",
});

const props = defineProps({
	loading: Boolean,
});

const emit = defineEmits(["login"]);

const onSubmit = () => {
	emit("login", { ...form });
};
</script>
