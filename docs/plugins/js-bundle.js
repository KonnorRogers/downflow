import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";
import esbuild from "esbuild";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

/**
 * Bundles the docs site's own JS (downflow included, resolved as a real
 * npm import) into a single file, instead of relying on an importmap.
 * @param {object} [options]
 * @param {string} [options.entryPoint] - relative to docs/assets/js
 * @param {string} [options.outputPath] - output path, relative to the eleventy output dir
 */
export function jsBundlePlugin(options = {}) {
  const jsDir = path.join(
    __dirname,
    "..",
    "assets",
    "js",
  )

  const entryPoints = {
    "index": path.join(jsDir, "index.js"),
    "downflow": path.join(jsDir, "downflow.js"),
    "fonts": path.join(jsDir, "fonts.js"),
  }
  const outputPath = options.outputPath || path.join("assets", "bundles");

  return function (eleventyConfig) {
    let criticalCSS = "";
    let chunks = []
    eleventyConfig.addWatchTarget(path.join(__dirname, "..", "assets", "js"));
    eleventyConfig.addGlobalData("criticalCSS", () => criticalCSS);
    eleventyConfig.addGlobalData("chunks", () => chunks);

    eleventyConfig.on("eleventy.before", async function ({ directories }) {
      const result = await esbuild.build({
        entryPoints: entryPoints,
        sourcemap: true,
        bundle: true,
        splitting: true,
        format: "esm",
        target: "es2020",
        outdir: path.join(directories.output, outputPath),
        loader: {
          '.ttf': 'file',
          '.woff2': 'file',
        },
        // external: [
        //   "downflow"
        // ]
        // entryNames: '[name]-[hash]',
        metafile: true
      });

      // Log or extract mappings directly from the metafile outputs
      const manifest = {};

      chunks = []
      for (const [key, value] of Object.entries(result.metafile.outputs)) {
        if (key.includes("assets/bundles/chunk-") && !key.endsWith(".map")) {
          const url = "/assets" + key.split("assets")[1]
          chunks.push(url)
        }
        // console.log({key,value})
        if (value.entryPoint) {
          manifest[value.entryPoint] = key;
        }
      }


      const cssFile = path.join(directories.output, outputPath, "index.css")
      criticalCSS = fs.readFileSync(cssFile, {encoding: "utf8"})
    });
  };
}
