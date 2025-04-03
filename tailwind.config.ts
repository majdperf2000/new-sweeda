import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extends: './tsconfig.json',
    include: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      'tailwind.config.ts',
      'jest.config.ts',
      'vite.config.ts',
    ],
    exclude: ['node_modules'],
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.custom-utility': {
          padding: '2rem',
          backgroundColor: '#3B82F6',
        },
      });
    }),
    require('tailwindcss-animate'),
  ],
};

export default config;
