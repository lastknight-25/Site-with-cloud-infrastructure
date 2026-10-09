terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "eu-north-1"
}


data "aws_ami" "al2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

resource "aws_instance" "first_server" {
  ami                    = data.aws_ami.al2023.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.server.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2.name

  user_data_replace_on_change = true
  user_data = <<-EOF
    #!/bin/bash
    dnf install -y docker
    systemctl enable --now docker
    aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin ${split("/", aws_ecr_repository.site.repository_url)[0]}
    docker run -d --restart unless-stopped -p 80:3000 ${aws_ecr_repository.site.repository_url}:latest
  EOF

  tags = {
    Name = "terraform-first-server"
  }
}

output "instance_id" {
  value = aws_instance.first_server.id
}

output "ecr_repository_url" {
  value = aws_ecr_repository.site.repository_url
}

output "site_url" {
  value = "http://${aws_instance.first_server.public_ip}"
}