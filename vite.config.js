// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// // plugins: [react()],
// // vite.config.js
// export default defineConfig({
// 	plugins: [
// 		[react()],
// 		{
// 			name: "postcss",
// 			apply: "build",
// 			use: [
// 				{
// 					loader: require("postcss-loader"),
// 					options: {
// 						postcssOptions: {
// 							...require("./postcss.config.cjs"),
// 						},
// 					},
// 				},
// 				{
// 					loader: require("postcss-loader"),
// 					options: {
// 						postcssOptions: {
// 							...require("./tailwind.config.js"),
// 						},
// 					},
// 				},
// 			],
// 		},
// 	],
// });

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		react(),
		{
			name: "postcss-mantine",
			apply: "build",
			configurePostcss(postcssOptions) {
				return require("postcss-load-config")({
					...postcssOptions,
					path: __dirname,
					ctx: "mantine",
				});
			},
		},
		{
			name: "postcss-tailwind",
			apply: "build",
			configurePostcss(postcssOptions) {
				return require("postcss-load-config")({
					...postcssOptions,
					path: __dirname,
					ctx: "tailwind",
				});
			},
		},
	],
});
