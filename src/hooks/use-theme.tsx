import { useContext, useEffect, useCallback, useMemo } from 'react';
import { ThemeProviderContext } from '@/components/theme-provider.js';

export type ThemeMode = 'dark' | 'light' | 'system';

/**
 * Custom hook for managing theme preferences
 * @returns {object} Theme context with current theme and setter function
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = context;

  // Memoize the system preference check
  const systemPrefersDark = useMemo(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Apply the current theme to the document
  const applyTheme = useCallback(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      root.classList.toggle('dark', systemPrefersDark);
      root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      root.setAttribute('data-theme', theme);
    }
  }, [theme, systemPrefersDark]);

  // Handle system theme changes
  const handleSystemThemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    },
    [theme]
  );

  // Set up effects for theme application and system preference tracking
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Add modern event listener with proper typing
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [handleSystemThemeChange]);

  // Enhanced setTheme function with persistence
  const persistTheme = useCallback(
    (newTheme: ThemeMode) => {
      try {
        setTheme(newTheme);
        // Persist to localStorage if needed
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error('Failed to persist theme:', error);
      }
    },
    [setTheme]
  );

  // Return enhanced context with additional utilities
  return {
    ...context,
    theme,
    setTheme: persistTheme,
    isDarkMode: theme === 'dark' || (theme === 'system' && systemPrefersDark),
    toggleTheme: () => persistTheme(theme === 'dark' ? 'light' : 'dark'),
    systemPrefersDark,
  };
}
