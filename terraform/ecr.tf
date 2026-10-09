resource "aws_ecr_repository" "site" {
  name         = "my-site"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }
}