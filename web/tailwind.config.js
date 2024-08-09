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
				'modal-overlay-open'  : 'modal-overlay-open 200ms ease both',
				'modal-overlay-close' : 'modal-overlay-close 200ms ease both',
				'modal-content-open'  : 'modal-content-open 200ms ease both',
				'modal-content-close' : 'modal-content-close 200ms ease both',
				'scale-in'   	: 'scale-in 100ms ease both',
				'spinner'       : 'spinner 1.8s linear infinite',
				'marquee'		: 'marquee 40s linear alternate infinite'
			},
			keyframes :{
				'modal-overlay-open' : {
					'0%'   : {opacity: 0},
					'100%' : {opacity : 1}
				},
				'modal-overlay-close' : {
					'0%'   : {opacity: 1},
					'100%' : {opacity : 0}
				},
				'modal-content-open' : {
					'0%'   : {transform : 'scale(0)'},
					'100%' : {transform : 'scale(1)'}
				},
				'modal-content-close' : {
					'0%'   : {transform : 'scale(1)'},
					'100%' : {transform : 'scale(0)'}
				},
				'scale-in' : {
					'0%' : {transform : 'scale(0.97)'},
					'100%' : {transform : 'scale(1)'}
				},
				'spinner' : {
					'from' : {transform : 'rotate(0deg)'},
					'to' : {transform : 'rotate(360deg)'}
				},
				'marquee' : {
					'from' : {transform : 'translateX(0%)'},
					'to' : {transform : 'translateX(-100%)'}
				}
			}
		},
  },
  darkMode : 'selector',
  plugins: [],
}