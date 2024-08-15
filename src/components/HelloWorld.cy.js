import HelloWorld from './HelloWorld.vue'
import { mount } from '@cypress/vue'

describe('HelloWorld Component', () => {
	it('renders properly', () => {
		mount(HelloWorld, {
			props: {
				msg: 'Hello Cypress!',
			},
		})
		cy.get('h1').should('contain', 'Hello Cypress!')

		cy.get('button').contains('count is').click()
		cy.get('button').should('contain', 'count is 1')
	})
})
