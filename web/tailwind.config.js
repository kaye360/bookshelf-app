/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			fontFamily : {
				'base' : ['Raleway', 'Helvetica', 'system-ui', 'sans-serif'],
				'theme' : ['Courgette', 'Helvetica', 'system-ui', 'sans-serif'],
			},
			// colors : {
			// 	"primary"   : "hsl( 190deg 48% 30% / <alpha-value> )",
			// 	"accent"    : "hsl( 0deg 70% 60% / <alpha-value> )",
			// 	"bg"	    : "hsl( 12deg 45% 99% / <alpha-value> )",
			// 	"bg-accent" : "hsl( 12deg 45% 97% / <alpha-value> )"
			// },
			colors : {
				"primary"   : "hsl( 195deg 23% 40% / <alpha-value> )",
				// "primary"   : "hsl( 107deg 26% 68% / <alpha-value> )",
				// "accent"    : "hsl( 0deg 93% 50% / <alpha-value> )",
				"accent"    : "hsl( 0deg 65% 60% / <alpha-value> )",
				"bg"	    : "hsl( 30deg 38% 99% / <alpha-value> )",
				"bg-accent" : "hsl( 30deg 38% 96% / <alpha-value> )"
			},
		},
  },
  plugins: [],
}