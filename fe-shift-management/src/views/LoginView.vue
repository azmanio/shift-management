<template>
	<div class="flex justify-center items-center mt-16">
		<div class="card w-96 bg-base-100 shadow-xl p-8">
			<h2 class="text-2xl font-bold text-center mb-4">Login</h2>
			<LoginForm @login="handleLogin" :loading="loading" />
			<p v-if="errorMessage" class="text-red-500 text-center mt-4">
				{{ errorMessage }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import LoginForm from "../components/LoginForm.vue";

const router = useRouter();
const authStore = useAuthStore();

const errorMessage = ref("");
const loading = ref(false);

const handleLogin = async (credentials) => {
	loading.value = true;
	errorMessage.value = "";
	try {
		await authStore.login(credentials);
		router.push({ name: "Home" });
	} catch (error) {
		errorMessage.value = "Invalid email or password";
	} finally {
		loading.value = false;
	}
};
</script>
