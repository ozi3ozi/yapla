import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="
        inline-flex items-center justify-center
        w-10 h-10
        rounded-md
        bg-background-dark
        dark:bg-background-dark
        text-text-primary
        dark:text-text-inverse
        hover:bg-background-subtle
        dark:hover:bg-primary-100
        transition-colors
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-primary-500
        group
      "
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5 group-hover:fill-black group-hover:stroke-black" fill="none" viewBox="0 0 24 24" stroke="white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5 group-hover:fill-black group-hover:stroke-black" fill="white" viewBox="0 0 24 24" stroke="white" strokeWidth={1}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
