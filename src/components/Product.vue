<template>
	<div>
		<h2>Product List</h2>

		<!-- Filter and Sort Controls -->
		<div>
			<input v-model="searchQuery" placeholder="Search products" />
			<select v-model="selectedCategory">
				<option value="">All Categories</option>
				<option value="Electronics">Electronics</option>
				<option value="Clothing">Clothing</option>
				<option value="Books">Books</option>
			</select>
			<select v-model="sortOrder">
				<option value="asc">Sort by Price: Low to High</option>
				<option value="desc">Sort by Price: High to Low</option>
			</select>
			<button @click="handleReset">Reset</button>
		</div>

		<!-- Product List -->
		<ul>
			<li v-for="product in filteredAndSortedProducts" :key="product.id">
				<span>{{ product.name }} - ${{ product.price }}</span>
				<span> ({{ product.category }})</span>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([
	{ id: 1, name: 'Smartphone', category: 'Electronics', price: 699 },
	{ id: 2, name: 'T-shirt', category: 'Clothing', price: 25 },
	{ id: 3, name: 'Laptop', category: 'Electronics', price: 999 },
	{ id: 4, name: 'Novel', category: 'Books', price: 15 },
	{ id: 5, name: 'Headphones', category: 'Electronics', price: 199 },
])

const searchQuery = ref('')
const selectedCategory = ref('')
const sortOrder = ref('asc')

const filteredAndSortedProducts = computed(() => {
	let filteredProducts = products.value

	// Filter by search query
	if (searchQuery.value) {
		filteredProducts = filteredProducts.filter(product =>
			product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		)
	}

	// Filter by category
	if (selectedCategory.value) {
		filteredProducts = filteredProducts.filter(
			product => product.category === selectedCategory.value
		)
	}

	// Sort by price
	filteredProducts = filteredProducts.sort((a, b) => {
		return sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
	})

	return filteredProducts
})

function handleReset() {
	searchQuery.value = ''
	selectedCategory.value = ''
	sortOrder.value = 'asc'
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
