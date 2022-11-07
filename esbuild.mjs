import { build } from "esbuild";
import { createWriteStream } from "fs";
import { ZipFile } from "yazl";

const outputPath = "infrastructure/dist";

const esbuildZipPlugin = (opts) => {
  return {
    name: `@rjpearson94/esbuild-zip`,
    setup(build) {
      build?.onEnd(() => {
        const zipFile = new ZipFile();

        const { outfile, sourcemap } = build.initialOptions;

        if (outfile) {
          const [fileName] = outfile.split("/").slice(-1);
          zipFile.addFile(outfile, fileName);
          if (sourcemap) {
            zipFile.addFile(`${outfile}.map`, `${fileName}.map`);
          }
        }

        zipFile.outputStream
          .pipe(createWriteStream(opts.outputPath))
          .on("close", () => {
            console.log(opts.onCompleteMessage);
          });
        zipFile.end();
      });
    },
  };
};

build({
  plugins: [
    esbuildZipPlugin({
      outputPath: `${outputPath}/function.zip`,
      onCompleteMessage: "Function zip has been generated",
    }),
  ],
  entryPoints: ["./src/index.ts"],
  tsconfig: "./tsconfig.json",
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: `${outputPath}/index.js`,
  platform: "node",
  target: "node16",
  logLevel: "error",
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
