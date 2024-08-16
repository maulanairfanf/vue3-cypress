import { mount } from '@cypress/vue'
import ProductList from './ProductList.vue'

describe('ProductList Component', () => {
	it('displays a list of products', () => {
		const products = [
			{ id: 1, name: 'Smartphone', category: 'Electronics', price: 699 },
			{ id: 2, name: 'T-shirt', category: 'Clothing', price: 25 },
		]

		mount(ProductList, {
			props: {
				products,
			},
		})

		cy.get('ul li').should('have.length', products.length)
		cy.get('ul li').first().should('contain', 'Smartphone')
		cy.get('ul li').last().should('contain', 'T-shirt')
	})
})
