import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import EmployeeManagementView from "../views/EmployeeManagementView.vue";
import AttendanceManagementView from "../views/AttendanceManagementView.vue";
import { useAuthStore } from "../stores/authStore";
import ShiftManagementView from "@/views/ShiftManagementView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "Login",
			component: LoginView,
		},
		{
			path: "/",
			name: "Home",
			component: HomeView,
		},
		{
			path: "/employees",
			name: "Employee",
			component: EmployeeManagementView,
			meta: { requiresAuth: true },
		},
		{
			path: "/shifts",
			name: "Shift",
			component: ShiftManagementView,
			meta: { requiresAuth: true },
		},
		{
			path: "/attendances",
			name: "Attendance",
			component: AttendanceManagementView,
			meta: { requiresAuth: true },
		},
	],
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	if (to.meta.requiresAuth && !authStore.isAuthenticated) {
		next({ name: "Login" });
	} else {
		next();
	}
});

export default router;
