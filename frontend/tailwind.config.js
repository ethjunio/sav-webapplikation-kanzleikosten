/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './src/styles/globals.css'],
	theme: {
		extend: {
			colors: {
				primary: '#004C93',
				primaryFade: '#3873AA',
				primaryFadeMore: '#a1b6dd',
				primaryDark: '#1d386b',
				black: '#0D0D0D',
				darkGray: '#555555',
				brightGray: '#F1F1F1',
			},
			fontSize: {},
			screens: {
				xl: { max: '1279px' },
				// => @media (max-width: 1279px) { ... }

				lg: { max: '1023px' },
				// => @media (max-width: 1023px) { ... }

				md: { max: '767px' },
				// => @media (max-width: 767px) { ... }

				sm: { max: '639px' },
				// => @media (max-width: 639px) { ... }
			},
			boxShadow: {
				onFocusInput: '0px 0px 0px 2px rgb(40, 76, 147,0.2)',
			},
			keyframes: {
				'fade-in-slide-up': {
					'0%': { opacity: 0, transform: 'translateY(10px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in-slide-up': 'fade-in-slide-up 0.3s ease-out forwards',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
