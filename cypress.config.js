import { defineConfig } from 'cypress'

export default defineConfig({
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
	},
	component: {
		devServer: {
			framework: 'vue',
			bundler: 'vite',
		},
		specPattern: 'src/components/**/*.cy.{js,ts,jsx,tsx}',
	},

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
})
