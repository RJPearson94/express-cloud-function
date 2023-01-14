# Infrastructure

The terraform module that can be used to deploy the cloud function to GCP

Before you can deploy the cloud function to GCP, you must build the cloud function zip. See the project [readme](../readme.md) for instructions to build the function

## Requirements

| Name                                                                     | Version   |
| ------------------------------------------------------------------------ | --------- |
| <a name="requirement_terraform"></a> [terraform](#requirement_terraform) | >= 0.13   |
| <a name="requirement_google"></a> [google](#requirement_google)          | >= 4.42.1 |

## Providers

| Name                                                      | Version |
| --------------------------------------------------------- | ------- |
| <a name="provider_google"></a> [google](#provider_google) | 4.42.1  |

## Modules

No modules.

## Resources

| Name                                                                                                                                                              | Type        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [google_cloudfunctions2_function.express_cloud_function](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloudfunctions2_function) | resource    |
| [google_project_iam_member.cloud_tracing_write](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_iam_member)                | resource    |
| [google_project_service.cloud_trace](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/project_service)                              | resource    |
| [google_service_account.function_service_account](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/service_account)                 | resource    |
| [google_storage_bucket.artefact_bucket](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket)                            | resource    |
| [google_storage_bucket_object.function_zip](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket_object)                 | resource    |
| [google_project.project](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/project)                                               | data source |

## Inputs

| Name                                                         | Description                                                                                                                                         | Type     | Default   | Required |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | :------: |
| <a name="input_location"></a> [location](#input_location)    | The Google region to deploy resources to                                                                                                            | `string` | n/a       |   yes    |
| <a name="input_log_level"></a> [log_level](#input_log_level) | The default logging level for pino. The list of possible values can be found at https://github.com/pinojs/pino/blob/master/docs/api.md#level-string | `string` | `"error"` |    no    |
| <a name="input_prefix"></a> [prefix](#input_prefix)          | Optional prefix applied to resource names                                                                                                           | `string` | `null`    |    no    |
| <a name="input_suffix"></a> [suffix](#input_suffix)          | Optional suffix applied to resource names                                                                                                           | `string` | `null`    |    no    |

## Outputs

| Name                                                                    | Description      |
| ----------------------------------------------------------------------- | ---------------- |
| <a name="output_function_uri"></a> [function_uri](#output_function_uri) | The function URI |
