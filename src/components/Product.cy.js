import { mount } from '@cypress/vue'
import Product from './Product.vue'

describe('Product Component', () => {
	beforeEach(() => {
		mount(Product)
	})

	it('should filter products by search query', () => {
		// Apply a search query
		cy.get('input[placeholder="Search products"]').type('novel')

		// Verify that products are filtered based on the search query
		cy.get('ul li').then($items => {
			// Check that each item contains the search query in a case-insensitive manner
			$items.each((index, item) => {
				cy.wrap(item)
					.invoke('text')
					.then(text => {
						expect(text.toLowerCase()).to.include('novel')
					})
			})
		})
	})

	it('should filter products by category', () => {
		// Select a category
		cy.get('select').first().select('Electronics')

		// Verify that products are filtered by the selected category
		cy.get('ul li').each($item => {
			cy.wrap($item).should('contain.text', 'Electronics')
		})
	})

	it('should sort products by price (low to high)', () => {
		// Sort by price ascending
		cy.get('select').last().select('asc')

		// Verify that products are sorted by price in ascending order
		let previousPrice = 0
		cy.get('ul li').each($item => {
			cy.wrap($item)
				.invoke('text')
				.then(text => {
					const price = parseFloat(text.match(/\$(\d+)/)[1])
					expect(price).to.be.at.least(previousPrice)
					previousPrice = price
				})
		})
	})

	it('should sort products by price (high to low)', () => {
		// Sort by price descending
		cy.get('select').last().select('desc')

		// Verify that products are sorted by price in descending order
		let previousPrice = Infinity
		cy.get('ul li').each($item => {
			cy.wrap($item)
				.invoke('text')
				.then(text => {
					const price = parseFloat(text.match(/\$(\d+)/)[1])
					expect(price).to.be.at.most(previousPrice)
					previousPrice = price
				})
		})
	})

	it('should reset filters and sorting when reset button is clicked', () => {
		// Apply some filters and sorting
		cy.get('input[placeholder="Search products"]').type('some text')
		cy.get('select').first().select('Electronics')
		cy.get('select').last().select('desc')

		// Click the reset button
		cy.get('button').contains('Reset').click()

		// Verify that filters and sorting are reset
		cy.get('input[placeholder="Search products"]').should('have.value', '')
		cy.get('select').first().should('have.value', '')
		cy.get('select').last().should('have.value', 'asc')
	})
})
