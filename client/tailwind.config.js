/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss,css}"
  ],
  theme: {
    extend: {
      // Aquí le decimos a Tailwind que use nuestras variables CSS semánticas
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        "danger-hover": "var(--color-danger-hover)",
        info: "var(--color-info)",
      },
    },
  },
  plugins: [],
}