/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "beige-500": "#98908b",
      "beige-100": "#f8f4f0",
      "grey-900": "#201f24",
      "grey-500": "#696868",
      "grey-300": "#b3b3b3",
      "grey-100": "#f2f2f2",
      green: "#277c78",
      yellow: "#f2cdac",
      cyan: "#82c9d7",
      navy: "#626070",
      red: "#C94736",
      purple: "#826CB0",
      pink: "#AF81BA",
      turquoise: "#597C7C",
      brown: "#93674F",
      magenta: "#934F6F",
      blue: "#3F82B2",
      "navy-grey": "#97A0AC",
      "army-green": "#7F9161",
      gold: "#CAB361",
      orange: "#BE6C49",
      white: "#fff",
    },
  },
  plugins: [],
};
