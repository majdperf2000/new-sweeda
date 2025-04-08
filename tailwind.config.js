const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.css'
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
    extend: {
      // تحسينات نظام الألوان
      colors: {
        // الألوان الأساسية
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // الألوان الوظيفية
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        
        // ألوان السايدبار
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        
        // الألوان الحديثة
        coral: '#FF6B6B',
        peach: '#FF8E53',
        cyan: '#4ECDC4',
        skyblue: '#45B7D1',
        
        // درجات الرمادي
        softwhite: '#F8F9FA',
        gridline: '#E9ECEF',
        darkgray: '#2D3436',
        bodygray: '#636E72',
        
        // أنظمة ألوان متكاملة
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          // ... (بقية الدرجات)
          950: '#042f2e',
        },
        azure: {
          50: '#f0f9ff',
          // ... (بقية الدرجات)
          950: '#082f49',
        },
        gold: {
          50: '#fefce8',
          // ... (بقية الدرجات)
          950: '#422006',
        },
      },
      
      // تحسينات الخطوط
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      
      // تحسينات الحركات والأنيميشن
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulsate-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0px rgba(78, 205, 196, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(78, 205, 196, 0)' },
        },
        // ... (بقية الأنيميشنز)
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulsate-glow': 'pulsate-glow 2s ease-in-out infinite',
        // ... (بقية الأنيميشنز)
      },
      
      // تأثيرات بصرية إضافية
      boxShadow: {
        soft: '0 2px 10px rgba(0, 0, 0, 0.05)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
        highlight: '0 0 15px rgba(14, 165, 233, 0.5)',
      },
      
      // خلفيات متدرجة
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #FF6B6B, #FF8E53)',
        'hero-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
      },
      
      // تأثيرات 3D
      perspective: {
        1000: '1000px',
        1500: '1500px',
        2000: '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  
  plugins: [
    require('tailwindcss-animate'),
    plugin(function({ addUtilities }) {
      const utilities = {
        // فئة 3D
        '.transform-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        
        // تأثيرات نصية
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0,0,0,0.1)',
        },
        
        // تأثيرات خاصة
        '.glow-effect': {
          'box-shadow': '0 0 10px rgba(74, 222, 128, 0.5)',
        },
      }
      addUtilities(utilities)
    }),
  ],
}