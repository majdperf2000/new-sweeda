// tailwind.plugin.ts
import plugin from 'tailwindcss/plugin'; // استيراد الدالة plugin بشكل صحيح

// إضافة utilities مخصصة مع تصحيح الأخطاء
export const customPlugins = plugin(({ addUtilities, addComponents }) => {
  // 1. Utilities مخصصة
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.scrollbar-hidden': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  });

  // 2. Components مخصصة
  addComponents({
    '.glass-effect': {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  });
});
