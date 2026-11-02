// @ts-check
import { defineConfig } from "astro/config";

// Built site is committed to ../dossier and served by GitHub Pages (legacy Jekyll build)
// at /ingles-game/dossier/. Assets avoid the "_astro" folder because Jekyll drops "_" folders.
export default defineConfig({
  site: "https://vazquezjoseluis0508.github.io",
  base: "/ingles-game/dossier",
  outDir: "../dossier",
  output: "static",
  trailingSlash: "always",
  build: { assets: "assets" },
});
