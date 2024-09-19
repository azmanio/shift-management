<template>
	<div class="alert" :class="alertClass">
		<div>
			<span>{{ message }}</span>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	type: String,
	message: String,
});

const alertClass = computed(() => {
	return type === "success" ? "alert-success" : "alert-error";
});
</script>

<style scoped>
.alert {
	padding: 1rem;
	border-radius: 0.5rem;
	margin-top: 1rem;
}
.alert-success {
	background-color: #d1fae5;
	color: #065f46;
}
.alert-error {
	background-color: #fee2e2;
	color: #b91c1c;
}
</style>
