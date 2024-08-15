<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Form from './components/Form.vue'
import Todo from './components/Todo.vue'
import Product from './components/Product.vue'

const fullName = ref('')

const handleFormSubmit = name => {
	fullName.value = name
}
</script>

<template>
	<!-- <div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
	<HelloWorld msg="Vite + Vue" />
	<div>
		<Form @submit="handleFormSubmit" />
		<p>Full Name: {{ fullName }}</p>
	</div>
	<div>
		<Product />
	</div> -->
	<div>
		<Todo />
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
