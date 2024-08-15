<template>
	<form @submit.prevent="handleSubmit">
		<div>
			<label for="first-name">First Name:</label>
			<input v-model="firstName" id="first-name" type="text" required />
		</div>
		<div>
			<label for="last-name">Last Name:</label>
			<input v-model="lastName" id="last-name" type="text" required />
		</div>
		<button type="submit" :disabled="!firstName || !lastName">Submit</button>
	</form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const firstName = ref('')
const lastName = ref('')

const emit = defineEmits(['submit'])

const handleSubmit = () => {
	const fullName = `${firstName.value} ${lastName.value}`
	emit('submit', fullName)

	// Reset form fields after submission
	firstName.value = ''
	lastName.value = ''
}
</script>
