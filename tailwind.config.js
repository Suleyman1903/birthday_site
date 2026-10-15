/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFCF8',
          100: '#FFF8F3',
          200: '#FDF0E8',
        },
        rose: {
          50: '#FFF0F5',
          100: '#FFE0EC',
          200: '#FFC1D9',
          300: '#FFA6C9',
          400: '#FF7BA8',
          500: '#FF6B9D',
          600: '#E85685',
          700: '#C0446B',
        },
        peach: {
          100: '#FFE8D6',
          200: '#FFD4B8',
          300: '#FFCBA4',
          400: '#FFB380',
        },
        gold: {
          300: '#FFD966',
          400: '#F6BE00',
          500: '#E0AA00',
        },
        sage: {
          300: '#C2D9BD',
          400: '#A8C4A0',
          500: '#8FB587',
        },
        ink: {
          700: '#5C4A52',
          800: '#4A3B42',
          900: '#3A2D33',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-mid': 'float 4.5s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'rise': 'rise 10s ease-in-out infinite both',
        'flicker': 'flicker 0.15s ease-in-out infinite alternate',
        'gradient': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'wind-blow': 'windBlow 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'flame-out': 'flameOut 0.4s ease-out forwards',
        'smoke-puff': 'smokePuff 1.2s ease-out forwards',
      },
      keyframes: {
        windBlow: {
          '0%': { transform: 'scale(0.4) translateX(-12px)', opacity: '0' },
          '40%': { transform: 'scale(1.05) translateX(0)', opacity: '0.85' },
          '100%': { transform: 'scale(1.3) translateX(12px)', opacity: '0' },
        },
        flameOut: {
          '0%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
          '35%': { transform: 'rotate(35deg) scale(1.1, 0.7)', opacity: '0.9' },
          '70%': { transform: 'rotate(50deg) scale(0.5, 0.4)', opacity: '0.5' },
          '100%': { transform: 'rotate(60deg) scale(0)', opacity: '0' },
        },
        smokePuff: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0.8' },
          '50%': { transform: 'translateY(-14px) scale(1.2)', opacity: '0.45' },
          '100%': { transform: 'translateY(-28px) scale(1.8)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.25' },
          '50%': { transform: 'translateY(-60vh) translateX(12px) rotate(180deg)', opacity: '0.35' },
          '85%': { opacity: '0.22' },
          '100%': { transform: 'translateY(-125vh) translateX(-8px) rotate(360deg)', opacity: '0' },
        },
        flicker: {
          '0%': { transform: 'scaleY(1) scaleX(1)', opacity: '1' },
          '100%': { transform: 'scaleY(0.85) scaleX(1.1)', opacity: '0.8' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
