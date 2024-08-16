import { mount } from '@cypress/vue'
import ProductList from './ProductList.vue'

describe('ProductList Component', () => {
	it('renders a list of products', () => {
		const products = [
			{ id: 1, name: 'Smartphone', category: 'Electronics', price: 699 },
			{ id: 2, name: 'T-shirt', category: 'Clothing', price: 25 },
			{ id: 3, name: 'Laptop', category: 'Electronics', price: 999 },
		]

		mount(ProductList, {
			props: {
				products: products,
			},
		})

		// Verify the number of product items
		cy.get('[data-cy="product-list"]')
			.find('[data-cy="product-item"]')
			.should('have.length', products.length)

		// Verify the content of each product
		products.forEach(product => {
			cy.contains(`[data-cy="product-item"]`, product.name)
			cy.contains(`[data-cy="product-item"]`, `$${product.price}`)
			cy.contains(`[data-cy="product-item"]`, `(${product.category})`)
		})
	})
})
