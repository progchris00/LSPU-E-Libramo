/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "site-bg": "#050d1a",
        table: "#0d111d",
        thead: "#171b26",
        "success-600": "#74dfa2",
        success: "#133a30",
        "warning-600": "#f31260",
        warning: "#3f1630",
        "custom-white": "#f1f9f8",
      },
      boxShadow: {
        custom:
          "0px 0px 5px 0px rgba(0,0,0,.05),0px 2px 10px 0px rgba(0,0,0,.2),inset 0px 0px 1px 0px hsla(0,0%,100%,.15)",
      },
    },
  },
  plugins: [],
};
