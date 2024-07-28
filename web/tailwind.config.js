/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			fontFamily : {
				'base'  : ['Plus Jakarta Sans', 'Helvetica', 'system-ui', 'sans-serif'],
				'theme' : ['Courgette', 'Helvetica', 'system-ui', 'sans-serif'],
			},
			colors : {
				"primary-dark"  : "hsl( var(--color-primary-dark) / <alpha-value> )",
				"primary-light" : "hsl( var(--color-primary-light) / <alpha-value> )",
				"accent"    	: "hsl( var(--color-accent) / <alpha-value> )",
				"bg"	    	: "hsl( var(--color-bg) / <alpha-value> )",
				"bg-accent" 	: "hsl( var(--color-bg-accent) / <alpha-value> )"
			},
			animation : {
				'modal-bg' 		: 'modal-bg 200ms ease both',
				'modal-content' : 'modal-content 200ms ease both',
				'scale-in'   	: 'scale-in 100ms ease both',
			},
			keyframes :{
				'modal-bg' : {
					'0%'   : {opacity: 0},
					'100%' : {opacity : 1}
				},
				'modal-content' : {
					'0%'   : {transform : 'translateY(30px)'},
					'100%' : {transform : 'translateY(0px)'}
				},
				'error-toast' : {
					'0%'  : {transform : 'translateY(30px)'},
					'80%' : {transform : 'translateY(-5px)'},
					'100%' : {transform : 'translateY(0)'},
				},
				'error-toast-timer' : {
					'0%'  : {width : '0%'},
					'100%' : {width : '100%'},
				},
				'scale-in' : {
					'0%' : {transform : 'scale(0.97)'},
					'100%' : {transform : 'scale(1)'}
				}
			}
		},
  },
  darkMode : 'selector',
  plugins: [],
}