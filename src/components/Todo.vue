<template>
	<div>
		<h2>Todo List</h2>
		<form @submit.prevent="addTodo">
			<input v-model="newTodo" placeholder="Add a new task" required />
			<button type="submit">Add</button>
		</form>
		<ul>
			<li v-for="todo in todos" :key="todo.id" style="padding: 10px">
				<input
					type="checkbox"
					:checked="todo.completed"
					@change="updateTodoStatus(todo)"
				/>
				<span style="margin: 10px" :class="{ completed: todo.completed }">{{
					todo.title
				}}</span>
				<button @click="removeTodo(todo.id)">Remove</button>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const todos = ref([])
const newTodo = ref('')

const fetchTodos = async () => {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos')
		if (response.ok) {
			const json = await response.json()
			console.log('json', json)
			todos.value = json
		}
	} catch (error) {
		console.error(error.message)
	}
}

const removeTodo = id => {
	todos.value = todos.value.filter(todo => todo.id !== id)
}

const addTodo = () => {
	todos.value.unshift({
		id: generateUniqueId(),
		title: newTodo.value,
		completed: false,
	})
	newTodo.value = ''
}

const updateTodoStatus = async payload => {
	payload.completed = !payload.completed
}

const generateUniqueId = () => {
	return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
}

onMounted(() => {
	fetchTodos()
})
</script>

<style scoped>
.completed {
	text-decoration: line-through;
}
</style>
