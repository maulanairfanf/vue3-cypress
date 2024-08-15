import { mount } from '@cypress/vue'
import Todo from './Todo.vue'

describe('TodoList Component', () => {
	it('should add a new todo item', () => {
		mount(Todo)

		// Tambahkan tugas baru
		cy.get('input[placeholder="Add a new task"]').type('New Task')
		cy.get('button[type="submit"]').click()

		// Periksa apakah tugas baru ditambahkan ke dalam daftar
		cy.get('ul').should('contain', 'New Task')
	})

	it('should remove a todo item and reduce the list by 1', () => {
		mount(Todo)

		// Simpan jumlah item sebelum penghapusan
		cy.get('ul li').then($listItems => {
			const initialCount = $listItems.length

			// Hapus tugas pertama
			cy.get('li').first().find('button').click()

			// Verifikasi bahwa jumlah item dalam daftar berkurang 1
			cy.get('ul li').should('have.length', initialCount - 1)
		})

		// Simpan jumlah item sebelum penghapusan
	})

	it('toggles the completion status of a todo item', () => {
		mount(Todo)

		// Tandai tugas pertama sebagai selesai
		cy.get('li').first().find('input[type="checkbox"]').check()

		// Verifikasi bahwa tugas pertama ditandai sebagai selesai
		cy.get('li').first().find('span').should('have.class', 'completed')
	})
})
