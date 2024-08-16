import { mount } from '@cypress/vue'
import Product from './Product.vue'

describe('Product Component', () => {
	beforeEach(() => {
		mount(Product)
	})

	it('renders the Product component with FilterControls and ProductList', () => {
		cy.get('[data-cy="filter-controls"]').should('exist')
		cy.get('[data-cy="product-list"]').should('exist')
	})

	it('filters the product list based on search input', () => {
		cy.get('[data-cy="name-search"]').type('Laptop')
		cy.get('[data-cy="product-list"]')
			.find('[data-cy="product-item"]')
			.should('have.length', 1)
			.and('contain', 'Laptop')
	})

	it('filters the product list based on selected category', () => {
		cy.get('[data-cy="category-select"]').select('Clothing')
		cy.get('[data-cy="product-list"]')
			.find('[data-cy="product-item"]')
			.should('have.length', 1)
			.and('contain', 'T-shirt')
	})

	it('sorts the product list by price', () => {
		cy.get('[data-cy="sort-order-select"]').select('desc')
		cy.get('[data-cy="product-list"]')
			.find('[data-cy="product-item"]')
			.first()
			.should('contain', 'Laptop')
	})

	it('resets the filters correctly', () => {
		cy.get('[data-cy="name-search"]').type('Laptop')
		cy.get('[data-cy="reset-button"]').click()
		cy.get('[data-cy="product-list"]')
			.find('[data-cy="product-item"]')
			.should('have.length', 5)
	})
})
