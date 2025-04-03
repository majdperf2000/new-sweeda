import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';
const NamedButton = () => (...);
 export default NamedButton;({
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#3B82F6',
      },
    },
  },
  import styles from './button.module.css';
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config);

