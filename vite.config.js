import { sveltekit } from "@sveltejs/kit/vite";
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), viteBasicSslPlugin()],
};

export default config;
