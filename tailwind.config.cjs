/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {zIndex: {
			'lowest': '-1',
		  }
	},
		fontFamily: {
			'text': ['Inter'],
			'heading': ['Lora'],
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: colors.slate,
			colored: colors.teal
		  },
	},
	plugins: [require('@tailwindcss/forms'),plugin(function({ addBase, theme, addComponents }) {
		addBase({
		  'h2': { marginBottom: theme("margin.2"), marginTop: theme("margin.4"), fontSize: theme('fontSize.2xl'), fontFamily: theme("fontFamily.heading") },
		  'h1': { fontSize: theme('fontSize.4xl'), fontFamily: theme("fontFamily.heading")},
		  "html": { fontFamily: theme("fontFamily.serif"), color: theme("colors.white.800") }, 
		  "p": {marginBottom: theme("margin.1")}
		}),
		addComponents({
			".section": { "margin-top": theme("margin.8") },
		})
	  })],
}
