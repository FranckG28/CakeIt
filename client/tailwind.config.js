module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    {
      pattern:
        /(text|border|bg|fill)-(neutral|primary|secondary|accent|info|success|warning|error)/,
    },
  ],
};
