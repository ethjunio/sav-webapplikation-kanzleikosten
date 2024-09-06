/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './src/styles/globals.css'],
	theme: {
		extend: {
			colors: {
				primary: '#004C93',
				primaryFade: '#3873AA',
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
		},
	},
	plugins: [],
};
