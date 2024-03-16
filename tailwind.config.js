// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// };

/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
	],
	lemonadeMode: ["class", '[data-theme="lemonade"]'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["system-ui", "sans-serif"],
			},
			colors: {
				greenBg: "#006A4E",
				legendGreenBg: "#00d278",
				legendBlueBg: "#130be3",
				legendSkyBlueBg: "#2870fe",
				legendViolateBg: "#3e00fa",
				legendLightBlueBg: "#00c0f9",
				legendLightGreenBg: "#00c0f9",
				legendYellowBg: "#fcf900",
				LegendDeepPinkBg: "#a50ab7",
				LegendOrangeBg: "#f98300",
				LegendRedBg: "#fe0000",
				LegendDarkBlue: "#fe0000",
				tableHeaderBg: "#f4fefe"
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			"light",
			{
				lemonade: {
					primary: "#006A4E",
				},
			},
		],
	},
});
