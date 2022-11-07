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
