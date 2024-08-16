<template>
	<ul data-cy="product-list">
		<li v-for="product in products" :key="product.id" data-cy="product-item">
			<span>{{ product.name }} - ${{ product.price }}</span>
			<span> ({{ product.category }})</span>
		</li>
	</ul>
</template>

<script setup>
defineProps({
	products: {
		type: Array,
		required: true,
	},
})
</script>
