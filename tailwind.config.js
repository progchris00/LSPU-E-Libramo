/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // dark theme
        "site-dark": "#050d1a",
        "table-dark": "#0d111d",
        "thead-dark": "#171b26",
        "font-dark": "#f1f9f8",

        // light theme
        "site-light": "#f3f4f8",
        "table-light": "#ffffff",
        "thead-light": "#f1f2f6",
        "heading-light": "#65676b",
        "primary-light": "#050505",

        // Alerts
        "success-600": "#74dfa2",
        success: "#133a30",
        "warning-600": "#f31260",
        warning: "#3f1630",
      },
      boxShadow: {
        custom:
          "0px 0px 5px 0px rgba(0,0,0,.05),0px 2px 10px 0px rgba(0,0,0,.2),inset 0px 0px 1px 0px hsla(0,0%,100%,.15)",
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out',
        slideOut: 'slideOut 0.5s ease-in',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
  },
  
  plugins: [],
};
