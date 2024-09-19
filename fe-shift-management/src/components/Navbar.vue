<template>
	<nav class="navbar bg-base-100 mb-5">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl font-bold"
				>Shift Management</a
			>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal gap-2 p-0">
				<li>
					<RouterLink to="/" class="nav-link">Home</RouterLink>
				</li>
				<li v-if="!isAuthenticated">
					<RouterLink to="/login" class="nav-link">Login</RouterLink>
				</li>
				<li v-if="isAuthenticated">
					<RouterLink to="/employees" class="nav-link"
						>Employee Management</RouterLink
					>
				</li>
				<li v-if="isAuthenticated">
					<RouterLink to="/attendances" class="nav-link"
						>Attendance Management</RouterLink
					>
				</li>
				<li v-if="isAuthenticated">
					<RouterLink to="/shifts" class="nav-link"
						>Shift Management</RouterLink
					>
				</li>
				<li v-if="isAuthenticated">
					<button @click="logout" class="btn btn-sm mt-1 btn-error">
						Logout
					</button>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const isAuthenticated = ref(authStore.isLoggedIn);

watch(
	() => authStore.isLoggedIn,
	(newVal) => {
		isAuthenticated.value = newVal;
	}
);

const logout = () => {
	authStore.logout();
};
</script>

<style scoped>
.nav-link {
	padding: 0.5rem 1rem;
}
</style>
