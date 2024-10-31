/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1440px",
        tablet: "768px",
        mobile: "375px",
      },
      container: {
        center: true,
        padding: {
          desktop: "32px",
          tablet: "32px",
          mobile: "16px",
        },
      },
      colors: {
        // Text colors
        primary: "#171717", // text-neutral-900
        "primary-hover": "#0a0a0a", // text-neutral-950
        "primary-invert": "#ffffff", // text-white
        secondary: "#525252", // text-neutral-600
        tertiary: "#737373", // text-neutral-500
        brand: "#4338ca", // text-indigo-700
        disabled: "#a3a3a3", // text-neutral-400
        error: "#dc2626", // text-red-600
        "error-emphasize": "#991b1b", // text-red-800
        success: "#15803d", // text-green-700
        warning: "#a16207", // text-amber-700

        // Background colors
        "bg-primary": "#ffffff",
        "bg-primary-inverted": "#0a0a0a",
        "bg-primary-hover": "#fafafa",
        "bg-secondary": "#e5e7eb",
        "bg-secondary-hover": "#d1d5db",
        "bg-tertiary": "#fafafa",
        "bg-disabled": "#f5f5f5",
        "bg-disabled-emphasize": "#f3f4f6",
        "bg-brand-primary": "#4338ca",
        "bg-brand-primary-emphasize": "#3730a3",
        "bg-error": "#dc2626",
        "bg-error-emphasize": "#b91c1c",
        "bg-error-subtle": "#fef2f2",
        "bg-success-subtle": "#f0fdf4",
        "bg-brand-subtle": "#eef2ff",
        "bg-neutral-subtle": "#f9fafb",
        "bg-warning-subtle": "#fffbeb",

        // Line colors (border/rings)
        "border-primary": "#e5e5e5",
        "border-secondary": "#9ca3af",
        "border-success": "#bbf7d0",
        "border-brand-solid": "#4f46e5",
        "border-brand-subtle": "#c7d2fe",
        "border-error-subtle": "#fecaca",
        "border-warning-subtle": "#fde68a",

        // Icon colors
        "icon-emphasize": "#404040",
        "icon-primary": "#a3a3a3",
        "icon-primary-hover": "#737373",
        "icon-brand": "#6366f1",
        "icon-brand-background": "#eef2ff",
        "icon-success": "#15803d",
        "icon-error": "#dc2626",
        "icon-warning": "#facc15",

        // Input field, Form, Textarea colors
        "input-title": "#404040",
        "input-placeholder": "#737373",
        "input-hint": "#737373",
        "input-filled": "#171717",
        "input-disabled": "#a3a3a3",
        "input-error": "#dc2626",
        "input-background": "#fafafa",
        "input-border": "#e5e5e5",
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


