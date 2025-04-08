const plugin = require('tailwindcss/plugin');
module.exports = { 
	darkMode: ["class"],
	content: [
		"./index.html",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/styles/**/*.css",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./index.css"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New vibrant color palette
				coral: '#FF6B6B',
				peach: '#FF8E53',
				cyan: '#4ECDC4',
				skyblue: '#45B7D1',
				softwhite: '#F8F9FA',
				gridline: '#E9ECEF',
				darkgray: '#2D3436',
				bodygray: '#636E72',
				teal: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
					950: '#042f2e',
				},
				azure: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49',
				},
				gold: {
					50: '#fefce8',
					100: '#fef9c3',
					200: '#fef08a',
					300: '#fde047',
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04',
					700: '#a16207',
					800: '#854d0e',
					900: '#713f12',
					950: '#422006',
				},
			},
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				display: ['Playfair Display', 'serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			perspective: {
				'1000': '1000px',
				'1500': '1500px',
				'2000': '2000px',
			},
			transformStyle: {
				'preserve-3d': 'preserve-3d',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'spin-slow': {
					'to': { transform: 'rotate(360deg)' }
				},
				'card-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(180deg)' }
				},
				'pulsate-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0px rgba(78, 205, 196, 0.4)' },
					'50%': { boxShadow: '0 0 0 10px rgba(78, 205, 196, 0)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'zoom-in': 'zoom-in 0.5s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 8s linear infinite',
				'card-flip': 'card-flip 0.3s ease-out',
				'pulsate-glow': 'pulsate-glow 2s ease-in-out infinite',
			},
			boxShadow: {
				'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
				'neu': '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff',
				'inner-neu': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
				'highlight': '0 0 15px rgba(14, 165, 233, 0.5)',
				'gold': '0 0 15px rgba(234, 179, 8, 0.3)',
				'vibrant-hover': '0 8px 24px rgba(255, 107, 107, 0.3)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			backgroundImage: {
				'primary-gradient': 'linear-gradient(to right, #FF6B6B, #FF8E53)',
				'secondary-gradient': 'linear-gradient(to right, #4ECDC4, #45B7D1)',
				'hero-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.perspective-1000': {
					perspective: '1000px',
				},
				'.perspective-1500': {
					perspective: '1500px',
				},
				'.perspective-2000': {
					perspective: '2000px',
				},
				'.transform-style-preserve-3d': {
					'transform-style': 'preserve-3d',
				},
				'.backface-visible': {
					'backface-visibility': 'visible',
				},
				'.backface-hidden': {
					'backface-visibility': 'hidden',
				},
				'.rotateY-15': {
					transform: 'rotateY(15deg)',
				},
				'.rotateY-180': {
					transform: 'rotateY(180deg)',
				},
			};
			addUtilities(newUtilities);
		}
	],
};