/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors - Warm earth tones
        primary: {
          50: '#FDF8F3',
          100: '#F9EBD9',
          150: 'rgba(189, 143, 57, 0.2)',
          200: '#F3D5B5',
          300: '#E9B872',
          400: '#DBA04F',
          500: '#BD8F39', // Primary brand color matching sidemenu light
          600: '#9C7431',
          700: '#785C26',
          800: '#634C20', // Matching header/footer dark
          900: '#2F2101', // Matching sidemenu dark
          DEFAULT: '#BD8F39',
        },
        secondary: {
          50: '#F9F6F3',
          100: '#F1EBE4',
          200: '#D2B887', // Matching header/footer light
          300: '#D4C5B4',
          400: '#C5B098',
          500: '#B69B7C',
          600: '#A68860',
          700: '#8E714D',
          800: '#755A3B',
          900: '#5C4328',
          DEFAULT: '#B69B7C',
        },

        // Layout colors
        layout: {
          // Header colors
          header: {
            light: '#D2B887',
            dark: '#634C20',
          },
          // Footer colors (same as header for consistency)
          footer: {
            light: '#D2B887',
            dark: '#634C20',
          },
          // Side menu colors
          sidemenu: {
            light: '#BD8F39',
            dark: '#2F2101',
          },
        },

        // Content colors
        content: {
          // Background colors for content areas
          bg: {
            light: '#FDF8F3', // Warm white
            dark: '#2F2101', // Deep brown
          },
          // Text colors
          text: {
            primary: {
              light: '#2F2101', // Deep brown
              dark: '#FDF8F3', // Warm white
            },
            secondary: {
              light: '#785C26', // Medium brown
              dark: '#E3DACF', // Light beige
            },
            muted: {
              light: '#9C7431', // Muted brown
              dark: '#B69B7C', // Muted beige
            },
          },
          // Border colors
          border: {
            light: 'rgba(189, 143, 57, 0.2)', // Primary color with opacity
            dark: 'rgba(227, 218, 207, 0.2)', // Secondary color with opacity
          },
        },

        // Link colors - Complementary to the earth tones
        link: {
          DEFAULT: '#9C7431', // Medium brown
          hover: '#785C26', // Darker brown
          dark: '#DBA04F', // Light brown
          'dark-hover': '#E9B872', // Lighter brown
        },

        // Background colors (system)
        background: {
          DEFAULT: '#FDF8F3', // Warm white
          paper: '#F9EBD9', // Light beige
          subtle: '#F1EBE4', // Subtle beige
          dark: '#2F2101', // Deep brown
        },

        // Surface colors (components)
        surface: {
          DEFAULT: '#FFFFFF',
          raised: '#F9F6F3', // Very light beige
          overlay: 'rgba(47, 33, 1, 0.5)', // Deep brown with opacity
        },

        // Status colors adjusted to match theme
        success: {
          light: '#5B8A32', // Earthy green
          dark: '#98B475', // Light earthy green
        },
        error: {
          light: '#A65D57', // Earthy red
          dark: '#D4938F', // Light earthy red
        },
        warning: {
          light: '#C17F59', // Earthy orange
          dark: '#E0B499', // Light earthy orange
        },
        info: {
          light: '#5C7F8A', // Earthy blue
          dark: '#9BB5BC', // Light earthy blue
        },
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right': 'slide-out-right 0.3s ease-out',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        none: 'none',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
