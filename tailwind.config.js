/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Tech & Clean
        'header-bg': 'hsl(217 91% 35%)', // #1E3A8A - Azul profundo
        'header-text': 'hsl(0 0% 100%)', // #FFFFFF - Blanco
        'header-hover': 'hsl(217 91% 60%)', // #3B82F6 - Azul medio
        'footer-bg': 'hsl(217 91% 35%)', // #1E3A8A - Azul profundo
        'footer-text': 'hsl(0 0% 100%)', // #FFFFFF - Blanco
        'section-alt': 'hsl(220 13% 98%)', // #F9FAFB - Gris muy claro
        'h1-color': 'hsl(217 91% 60%)', // #3B82F6 - Azul medio
        'h2-color': 'hsl(217 91% 35%)', // #1E3A8A - Azul profundo
        'body-color': 'hsl(215 19% 35%)', // #374151 - Gris oscuro
        'primary-new': 'hsl(217 91% 60%)', // #2563EB - Celeste brillante
        'secondary-new': 'hsl(220 13% 95%)', // #F3F4F6 - Gris claro
        'accent-new': 'hsl(217 91% 60%)', // #3B82F6 - Azul medio
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
