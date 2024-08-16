<template>
	<div data-cy="filter-controls">
		<input
			data-cy="name-search"
			v-model="localSearchQuery"
			placeholder="Search products"
			@input="emitSearchQuery"
			style="margin: 5px"
		/>
		<select
			data-cy="category-select"
			v-model="localSelectedCategory"
			@change="emitCategory"
			style="margin: 5px"
		>
			<option value="">All Categories</option>
			<option value="Electronics">Electronics</option>
			<option value="Clothing">Clothing</option>
			<option value="Books">Books</option>
		</select>
		<select
			data-cy="sort-order-select"
			v-model="localSortOrder"
			@change="emitSortOrder"
			style="margin: 5px"
		>
			<option value="asc">Sort by Price: Low to High</option>
			<option value="desc">Sort by Price: High to Low</option>
		</select>
		<button data-cy="reset-button" @click="emitReset" style="margin: 5px">
			Reset
		</button>
	</div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
	searchQuery: String,
	selectedCategory: String,
	sortOrder: String,
})

const emit = defineEmits([
	'update-search-query',
	'update-category',
	'update-sort-order',
	'reset-filters',
])

const localSearchQuery = ref(props.searchQuery)
const localSelectedCategory = ref(props.selectedCategory)
const localSortOrder = ref(props.sortOrder)

watch(props, () => {
	localSearchQuery.value = props.searchQuery
	localSelectedCategory.value = props.selectedCategory
	localSortOrder.value = props.sortOrder
})

function emitSearchQuery() {
	emit('update-search-query', localSearchQuery.value)
}

function emitCategory() {
	emit('update-category', localSelectedCategory.value)
}

function emitSortOrder() {
	emit('update-sort-order', localSortOrder.value)
}

function emitReset() {
	emit('reset-filters')
}
</script>
