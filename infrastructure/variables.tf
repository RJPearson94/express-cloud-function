variable "location" {
  description = "The Google region to deploy resources to"
  type        = string
}

variable "log_level" {
  description = "The default logging level for pino. The list of possible values can be found at https://github.com/pinojs/pino/blob/master/docs/api.md#level-string"
  type        = string
  default     = "error"
}

variable "prefix" {
  description = "Optional prefix applied to resource names"
  type        = string
  default     = null
}

variable "suffix" {
  description = "Optional suffix applied to resource names"
  type        = string
  default     = null
}
