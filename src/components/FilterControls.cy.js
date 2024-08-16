import { mount } from '@cypress/vue'
import FilterControls from './FilterControls.vue'

describe('FilterControls Component', () => {
	it('emits the correct events when inputs change', () => {
		const onUpdateSearchQuery = cy.spy().as('onUpdateSearchQuery')
		const onUpdateCategory = cy.spy().as('onUpdateCategory')
		const onUpdateSortOrder = cy.spy().as('onUpdateSortOrder')

		mount(FilterControls, {
			props: {
				searchQuery: '',
				selectedCategory: '',
				sortOrder: 'asc',
				onUpdateSearchQuery: onUpdateSearchQuery,
				onUpdateCategory: onUpdateCategory,
				onUpdateSortOrder: onUpdateSortOrder,
			},
		})

		cy.get('[data-cy="name-search"]').type('Laptop')
		cy.get('[data-cy="category-select"]').select('Electronics')
		cy.get('[data-cy="sort-order-select"]').select('desc')

		cy.get('@onUpdateSearchQuery').should('have.been.calledWith', 'Laptop')
		cy.get('@onUpdateCategory').should('have.been.calledWith', 'Electronics')
		cy.get('@onUpdateSortOrder').should('have.been.calledWith', 'desc')
	})

	it('emits reset event when reset button is clicked', () => {
		const onResetFilters = cy.spy().as('onResetFilters')

		mount(FilterControls, {
			props: {
				searchQuery: 'Smartphone',
				selectedCategory: 'Electronics',
				sortOrder: 'asc',
				onResetFilters: onResetFilters,
			},
		})

		cy.get('[data-cy="reset-button"]').click()
		cy.get('@onResetFilters').should('have.been.calledOnce')
	})
})
