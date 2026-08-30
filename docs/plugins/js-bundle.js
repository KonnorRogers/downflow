import * as path from "node:path";
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
    eleventyConfig.addWatchTarget(path.join(__dirname, "..", "assets", "js"));

    eleventyConfig.on("eleventy.after", async function ({ directories }) {
      await esbuild.build({
        entryPoints: entryPoints,
        sourcemap: true,
        bundle: true,
        splitting: true,
        format: "esm",
        target: "es2017",
        outdir: path.join(directories.output, outputPath),
        loader: {
          '.ttf': 'file',
          '.woff2': 'file',
        },
        // external: [
        //   "downflow"
        // ]
      });
    });
  };
}
