# Express Cloud Function

This project demonstrates how you can use an express app within a Gen 2 GCP Cloud Function. This repo is influenced by a medium post https://medium.com/google-cloud/express-routing-with-google-cloud-functions-36fb55885c68 by Grant Timmerman's

This repo shows how express can be utilised for handling routing and express middleware can be used on various routes.

The project includes a TypeScript cloud function and example Terraform code to allow you to get up and running, the code can be found in the [infrastructure](./infrastructure/) folder.

## Getting Started

The project use Yarn to manage dependencies, the dependencies can be installed using the following command

```sh
yarn install
```

[Esbuild](https://esbuild.github.io/) is used to bundle and [yazl](https://github.com/thejoshwolfe/yazl) is used to zip the bundled artefacts to allow them to be uploaded to GCS which then can be deployed to a Gen 2 Cloud Function environment. The zip can be built by running the following command

```sh
yarn build
```

The tests are written using [jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest), they can be run using the following command

```sh
yarn test
```

## Tracing

The Cloud Function utilises [OpenTelemetry](https://opentelemetry.io/) to provide auto-instrumentation of the code to analyze application performance. The telemetry data is exported to [Cloud Trace](https://cloud.google.com/trace) to be visualised and interrogated, to allow this capability the Cloud Trace API needs to be enabled on the account. This service is enabled as part of the Terraform infrastructure.

The `cloudtrace.agent` role is added to the Cloud Function service account to allow the exporter to push spans to Cloud Tracing.

The Cloud Function node.js runtime execute code before requiring/ executing custom code, this affected auto-instrumentation when the config was added to the express app. Therefore the tracing config was moved into a script ([tracing-wrapper](./utils/tracing-wrapper.ts)) which is execute before the function script, this code can be found in the [utils](./utils/) folder. To ensure the tracing-wrapper code is executed first the `NODE_OPTIONS` environment variable is set to `--require ./tracing-wrapper.js`. The esbuild config as been updated to bundle both the application code and tracing-wrapper into the zip uploaded to GCS/ Cloud Functions. Due to issues during minification/ tree-shaking, the dependencies for the tracing-wrapper are not bundled instead the package.json and yarn.lock in the utils folder are uploaded to GCP for Google to download the dependencies as part of the build process.
