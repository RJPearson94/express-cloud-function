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

        const { outdir, entryPoints, sourcemap } = build.initialOptions;

        if (outdir) {
          entryPoints.forEach((entryPoint) => {
            const pathParts = entryPoint.split("/");

            const path = `${outdir}/${pathParts.slice(0, -1).join("/")}`;
            const [fileName] = pathParts.slice(-1);
            const jsFileName = fileName.replace(".ts", ".js");
            const jsFilePath = `${path}/${jsFileName}`;

            zipFile.addFile(jsFilePath, jsFileName);
            if (sourcemap) {
              zipFile.addFile(`${jsFilePath}.map`, `${jsFileName}.map`);
            }
          });
        }

        opts.additionalFiles?.forEach(({ name, path }) => {
          zipFile.addFile(path, name);
        });

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
      additionalFiles: [
        { name: "package.json", path: "utils/package.json" },
        { name: "yarn.lock", path: "utils/yarn.lock" },
      ],
    }),
  ],
  entryPoints: ["utils/tracing-wrapper.ts", "src/index.ts"],
  external: [
    "@google-cloud/opentelemetry-cloud-trace-exporter",
    "@opentelemetry/*",
  ],
  tsconfig: "./tsconfig.json",
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: outputPath,
  platform: "node",
  target: "node16",
  logLevel: "error",
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
