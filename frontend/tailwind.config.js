/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F7F2",
        foreground: "#18281F",
        organic: {
          bg: "#F6F7F2",
          card: "#FFFFFF",
          pill: "#E7EBE2",
          dark: "#1A3D2F",
          deep: "#0F2E23",
          emerald: "#26523C",
          sage: "#8BAA92",
          muted: "#5F7367",
          accent: "#D4E897",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#18281F",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#18281F",
        },
        primary: {
          DEFAULT: '#26523C',
          dark: '#1A3D2F',
          light: '#E7EBE2',
          accent: '#D4E897',
          foreground: "#FFFFFF",
        },
        brand: {
          dark: '#1A3D2F',
          deep: '#0F2E23',
          light: '#F6F7F2',
          teal: '#26523C',
          pill: '#E7EBE2',
        },
        secondary: {
          DEFAULT: "#E7EBE2",
          foreground: "#18281F",
        },
        muted: {
          DEFAULT: "#E7EBE2",
          foreground: "#5F7367",
        },
        accent: {
          DEFAULT: "#D4E897",
          foreground: "#1A3D2F",
        },
        destructive: {
          DEFAULT: "#E53E3E",
          foreground: "#FFFFFF",
        },
        border: "rgba(24, 40, 31, 0.08)",
        input: "rgba(24, 40, 31, 0.08)",
        ring: "#26523C",
      },
      borderRadius: {
        '4xl': '2rem',
        '3xl': '1.5rem',
        '2xl': '1.25rem',
        xl: '1rem',
        lg: '0.75rem',
        md: '0.5rem',
        full: '9999px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(24, 40, 31, 0.05)',
        'glass-hover': '0 12px 40px 0 rgba(24, 40, 31, 0.1)',
        'pill': '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
