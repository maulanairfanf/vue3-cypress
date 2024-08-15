import { mount } from '@cypress/vue'
import Form from './Form.vue'

describe('Form Component', () => {
	it('emits full name on form submission', () => {
		// Membuat spy untuk menangkap event 'submit'
		const submitSpy = cy.spy().as('submitSpy')

		// Mount komponen dan tambahkan spy pada event 'submit'
		mount(Form, {
			props: {
				onSubmit: submitSpy,
			},
		})

		// Isi form dengan nama depan dan nama belakang
		cy.get('input#first-name').type('John')
		cy.get('input#last-name').type('Doe')

		// Klik tombol submit
		cy.get('button[type="submit"]').click()

		// Verifikasi bahwa event 'submit' dipancarkan dengan nama lengkap yang benar
		cy.get('@submitSpy').should('have.been.calledWith', 'John Doe')
	})
	it('emits full name on form submission', () => {
		const submitSpy = cy.spy().as('submitSpy')

		mount(Form, {
			props: {
				onSubmit: submitSpy,
			},
		})

		// Isi form dengan nama depan dan nama belakang
		cy.get('input#first-name').type('John')
		cy.get('input#last-name').type('Doe')

		// Klik tombol submit
		cy.get('button[type="submit"]').click()

		// Verifikasi bahwa event 'submit' dipancarkan dengan nama lengkap yang benar
		cy.get('@submitSpy').should('have.been.calledWith', 'John Doe')
	})

	it('validates input fields and disables submit button when fields are empty', () => {
		mount(Form)

		// Pastikan tombol submit dinonaktifkan ketika form kosong
		cy.get('button[type="submit"]').should('be.disabled')

		// Isi hanya nama depan
		cy.get('input#first-name').type('John')

		// Pastikan tombol submit masih dinonaktifkan
		cy.get('button[type="submit"]').should('be.disabled')

		// Isi nama belakang
		cy.get('input#last-name').type('Doe')

		// Pastikan tombol submit aktif ketika kedua input terisi
		cy.get('button[type="submit"]').should('not.be.disabled')
	})

	it('resets form fields after successful submission', () => {
		const submitSpy = cy.spy().as('submitSpy')

		mount(Form, {
			props: {
				onSubmit: submitSpy,
			},
		})

		// Isi form dengan nama depan dan nama belakang
		cy.get('input#first-name').type('John')
		cy.get('input#last-name').type('Doe')

		// Klik tombol submit
		cy.get('button[type="submit"]').click()

		// Verifikasi bahwa form dikosongkan setelah submit
		cy.get('input#first-name').should('have.value', '')
		cy.get('input#last-name').should('have.value', '')
	})
})
