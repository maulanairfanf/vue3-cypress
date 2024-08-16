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

		cy.get('input[placeholder="Search products"]').type('Laptop')
		cy.get('select').eq(0).select('Electronics')
		cy.get('select').eq(1).select('desc')

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

		cy.get('button').contains('Reset').click()
		cy.get('@onResetFilters').should('have.been.calledOnce')
	})
})
