<template>
	<div>
		<h2>Product List</h2>

		<!-- Filter and Sort Controls -->
		<FilterControls
			:search-query="searchQuery"
			:selected-category="selectedCategory"
			:sort-order="sortOrder"
			@update-search-query="updateSearchQuery"
			@update-category="updateCategory"
			@update-sort-order="updateSortOrder"
			@reset-filters="handleReset"
		/>

		<!-- Product List -->
		<ProductList :products="filteredAndSortedProducts" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterControls from './FilterControls.vue'
import ProductList from './ProductList.vue'

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

function updateSearchQuery(query) {
	searchQuery.value = query
}

function updateCategory(category) {
	selectedCategory.value = category
}

function updateSortOrder(order) {
	sortOrder.value = order
}

function handleReset() {
	searchQuery.value = ''
	selectedCategory.value = ''
	sortOrder.value = 'asc'
}
</script>
