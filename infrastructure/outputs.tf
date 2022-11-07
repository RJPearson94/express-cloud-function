output "function_uri" {
  description = "The function URI"
  value       = google_cloudfunctions2_function.express_cloud_function.service_config[0].uri
}
