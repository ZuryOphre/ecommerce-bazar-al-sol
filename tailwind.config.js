/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'negro': '#000000',
        'blanco': '#ffffff',
        'marron-tierra': '#8b4513',
        'naranja-calido': '#ffa500',
        'amarillo-brillante': '#ffd700',
        'verde-esperanza': '#00a74a',
      }
    },
  },
  plugins: [],
}