locals {
  prefix       = var.prefix != null ? "${var.prefix}-" : ""
  suffix       = var.suffix != null ? "-${var.suffix}" : ""
  name         = "express-cloud-function"
  zip_name     = "function.zip"
  zip_location = "${path.module}/dist/${local.zip_name}"
}

# Function/ Artefact Storage

resource "google_storage_bucket" "artefact_bucket" {
  name                        = "${local.prefix}${local.name}-artefact-bucket${local.suffix}"
  location                    = var.location
  uniform_bucket_level_access = true
}

resource "google_storage_bucket_object" "function_zip" {
  name   = "${filemd5(local.zip_location)}/${local.zip_name}"
  bucket = google_storage_bucket.artefact_bucket.name
  source = local.zip_location

  lifecycle {
    create_before_destroy = true
  }
}

# Service Account

resource "google_service_account" "function_service_account" {
  account_id = "${local.prefix}${local.name}-sa${local.suffix}"
}

resource "google_project_iam_member" "cloud_tracing_write" {
  project = data.google_project.project.number
  role    = "roles/cloudtrace.agent"
  member  = "serviceAccount:${google_service_account.function_service_account.email}"
}

# Function

resource "google_cloudfunctions2_function" "express_cloud_function" {
  name     = "${local.prefix}${local.name}${local.suffix}"
  location = var.location

  build_config {
    runtime     = "nodejs16"
    entry_point = "handler"

    source {
      storage_source {
        bucket = google_storage_bucket.artefact_bucket.name
        object = google_storage_bucket_object.function_zip.name
      }
    }
  }

  service_config {
    available_memory      = "256M"
    timeout_seconds       = 60
    max_instance_count    = 10
    service_account_email = google_service_account.function_service_account.email

    environment_variables = {
      LOG_LEVEL = var.log_level,
      NODE_ENV  = "production",
      NODE_OPTIONS: "--require ./tracing-wrapper.js"
    }
  }
}
