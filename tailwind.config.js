module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        billar: '#0d5d3f',
        'billar-dark': '#052f23',
        gold: '#d4af37',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'billar': '0 0 20px rgba(13, 93, 63, 0.3)',
      },
    },
  },
  plugins: [],
}
