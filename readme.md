-- Start of the project -- 

16/08/2026 : 
-so far I have layed down the base of the site, a couple of working pages (made with node and express). will still continue working on it and maybe add some UX.  

-worked a bit on the products page and it's CSS.


07/10/2026-08/10/2026 :
-could get back to work on the project. Added the docker and the first terraform files to launch the server instances on AWS.


# useful commands 

- docker run -p 3000:3000 my-site    // to launch site on docker 
- docker ps
- docker stop    // with id from docker ps
- docker container prune    // purge all stopped containers


- terraform init 
- terraform plan 
- terraform apply 
- terraform destory

// create the "shelf"

terraform apply -target=aws_ecr_repository.site
terraform output ecr_repository_url


// the ECR repo url 

- 489501679096.dkr.ecr.eu-north-1.amazonaws.com/my-site

// pushing the image onto the docker 

- aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin <489501679096.dkr.ecr.eu-north-1.amazonaws.com/my-site>
- docker build -t my-site site/
- docker tag my-site:latest 489501679096.dkr.ecr.eu-north-1.amazonaws.com/my-site:latest
- docker push 489501679096.dkr.ecr.eu-north-1.amazonaws.com/my-site

// check the images 
 
- aws ecr describe-images --repository-name my-site --region eu-north-1