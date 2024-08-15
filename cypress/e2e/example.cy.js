describe('Contoh Tes Cypress', () => {
	it('Memuat halaman utama', () => {
		cy.visit('http://localhost:5173')
		cy.contains('Vite + Vue').should('be.visible')
	})

	it('Memeriksa interaksi tombol', () => {
		cy.visit('http://localhost:5173')
		cy.get('button').contains('count is').click()
		cy.get('button').should('contain', 'count is 1')
	})

	it('submits the form and displays full name', () => {
		// Mengunjungi halaman aplikasi
		cy.visit('http://localhost:5173')

		// Isi form dengan nama depan dan nama belakang
		cy.get('input#first-name').type('John')
		cy.get('input#last-name').type('Doe')

		// Klik tombol submit
		cy.get('button[type="submit"]').click()

		// Verifikasi bahwa nama lengkap ditampilkan dengan benar
		cy.contains('p', 'Full Name: John Doe').should('be.visible')
	})
})
