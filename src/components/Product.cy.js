import { mount } from '@cypress/vue'
import Product from './Product.vue'

describe('Product', () => {
	it('filters and sorts products correctly', () => {
		mount(Product)

		cy.get('input[placeholder="Search products"]').type('Laptop')
		cy.get('select').eq(0).select('Electronics')
		cy.get('select').eq(1).select('desc')

		cy.get('ul li').should('have.length', 1)
		cy.get('ul li').first().should('contain', 'Laptop')
	})

	it('resets filters correctly', () => {
		mount(Product)

		// Set filters
		cy.get('input[placeholder="Search products"]').type('Laptop')
		cy.get('select').eq(0).select('Electronics')
		cy.get('select').eq(1).select('desc')

		// Reset filters
		cy.get('button').contains('Reset').click()

		cy.get('input[placeholder="Search products"]').should('have.value', '')
		cy.get('select').eq(0).should('have.value', '')
		cy.get('select').eq(1).should('have.value', 'asc')
	})
})
