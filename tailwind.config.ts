import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { 
          DEFAULT: "hsl(var(--primary))", 
          foreground: "hsl(var(--primary-foreground))" 
        },
        secondary: { 
          DEFAULT: "hsl(var(--secondary))", 
          foreground: "hsl(var(--secondary-foreground))" 
        },
        destructive: { 
          DEFAULT: "hsl(var(--destructive))", 
          foreground: "hsl(var(--destructive-foreground))" 
        },
        muted: { 
          DEFAULT: "hsl(var(--muted))", 
          foreground: "hsl(var(--muted-foreground))" 
        },
        accent: { 
          DEFAULT: "hsl(var(--accent))", 
          foreground: "hsl(var(--accent-foreground))" 
        },
        popover: { 
          DEFAULT: "hsl(var(--popover))", 
          foreground: "hsl(var(--popover-foreground))" 
        },
        card: { 
          DEFAULT: "hsl(var(--card))", 
          foreground: "hsl(var(--card-foreground))" 
        },
        earth: { 
          50: "#faf8f5", 
          100: "#f2ede6", 
          200: "#e8dcc9", 
          300: "#d9c6a3", 
          400: "#c7a876", 
          500: "#b88d52", 
          600: "#a67340", 
          700: "#8a5c35", 
          800: "#714b31", 
          900: "#5c3e2b",
          950: "#3d2619"
        },
        nature: { 
          50: "#f4f9f4", 
          100: "#e3f2e3", 
          200: "#c5e3c5", 
          300: "#98cc98", 
          400: "#65ad65", 
          500: "#439143", 
          600: "#317331", 
          700: "#295c29", 
          800: "#234923", 
          900: "#1e3d1e",
          950: "#0f240f"
        },
        harvest: { 
          50: "#fefbf3", 
          100: "#fdf5e1", 
          200: "#fae8c0", 
          300: "#f6d596", 
          400: "#f0bb63", 
          500: "#e99f35", 
          600: "#da8228", 
          700: "#b56321", 
          800: "#924e1f", 
          900: "#76401c",
          950: "#43220d"
        },
      },
      borderRadius: { 
        lg: "var(--radius)", 
        md: "calc(var(--radius) - 2px)", 
        sm: "calc(var(--radius) - 4px)" 
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(67, 145, 67, 0.15)',
        'glow-lg': '0 0 40px rgba(67, 145, 67, 0.2)',
      },
      keyframes: {
        "accordion-down": { 
          from: { height: "0" }, 
          to: { height: "var(--radix-accordion-content-height)" } 
        },
        "accordion-up": { 
          from: { height: "var(--radix-accordion-content-height)" }, 
          to: { height: "0" } 
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" }
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" }
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" }
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
      },
      animation: { 
        "accordion-down": "accordion-down 0.2s ease-out", 
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
