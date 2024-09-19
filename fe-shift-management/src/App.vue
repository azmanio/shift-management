<template>
	<div class="min-h-screen bg-base-200 flex flex-col">
		<Navbar />
		<main class="flex-1">
			<RouterView />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import { useAuthStore } from "./stores/authStore";
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Alert from "./components/Alert.vue";

const authStore = useAuthStore();

onMounted(() => {
	const token = localStorage.getItem("token");
	if (token) {
		authStore.fetchUser();
	}
});
</script>
