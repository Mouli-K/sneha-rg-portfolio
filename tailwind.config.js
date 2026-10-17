/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1A146B",
        "primary-container": "#312E81"
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "body": ["Inter", "system-ui", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};
