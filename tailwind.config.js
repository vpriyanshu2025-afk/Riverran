/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#E8DED1',
          300: '#DBCBB8',
          400: '#CBB49B',
        },
        noir: {
          950: '#050505',
          900: '#0A0A0A',
          800: '#171717',
          700: '#262626',
          600: '#404040',
        },
        champagne: {
          100: '#FDF8EC',
          200: '#F8E8C7',
          300: '#E5C378',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A6823F',
          700: '#84642C',
        }
      },
      fontFamily: {
        heading: ['"Clash Display"', 'Inter', 'sans-serif'],
        sans: ['"General Sans"', 'Inter', 'sans-serif'],
        serif: ['"Clash Display"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(10, 10, 10, 0.08)',
        'gold': '0 10px 30px -5px rgba(212, 175, 55, 0.25)',
        'card-hover': '0 25px 50px -12px rgba(10, 10, 10, 0.12)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
