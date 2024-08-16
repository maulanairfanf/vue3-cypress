<template>
	<ul>
		<li v-for="product in products" :key="product.id">
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
