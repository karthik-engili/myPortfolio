/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spidey: {
          red: '#e23636',
          'red-dark': '#b71c1c',
          'red-light': '#ff5252',
          blue: '#2146c7',
          'blue-dark': '#1a237e',
          'blue-light': '#4361ee',
          dark: {
            900: '#0a0a0a',
            800: '#111122',
            700: '#1a1a2e',
            600: '#16213e',
            500: '#1e2a4a',
          },
          light: {
            100: '#f8f9fa',
            200: '#f0f0f5',
            300: '#e0e0e8',
            400: '#c8c8d4',
          },
        },
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
        code: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'web-pulse': 'webPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(20) forwards',
        'web-shoot': 'webShoot 0.4s ease-out',
      },
      keyframes: {
        webPulse: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(226, 54, 54, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(226, 54, 54, 0.6), 0 0 40px rgba(226, 54, 54, 0.3)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        webShoot: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 0 },
        },
      },
      backgroundImage: {
        'web-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23e23636' stroke-opacity='0.05' stroke-width='0.5'%3E%3Cpath d='M30 0L30 60M0 30L60 30M0 0L60 60M60 0L0 60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'spidey': '0 0 15px rgba(226, 54, 54, 0.3)',
        'spidey-lg': '0 0 30px rgba(226, 54, 54, 0.4), 0 0 60px rgba(226, 54, 54, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 8px 40px rgba(226, 54, 54, 0.2)',
      },
    },
  },
  plugins: [],
}
