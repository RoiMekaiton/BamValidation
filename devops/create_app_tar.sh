#!/bin/bash

mkdir bamvalidation_installation
mkdir bamvalidation_app

# -------------------------- compress the docker images --------------------------
docker-compose -f ../docker-compose.yml build
docker tag devops_frontend bamvalidation_frontend
docker tag devops_backend bamvalidation_backend

docker save -o bamvalidation_frontend.tar.gz bamvalidation_frontend
docker save -o bamvalidation_backend.tar.gz bamvalidation_backend

mkdir docker_images

mv bamvalidation_frontend.tar.gz docker_images
mv bamvalidation_backend.tar.gz docker_images

tar -czvf docker_images.tar.gz docker_images
rm -r docker_images
mv docker_images.tar.gz bamvalidation_app


# -------------------------- create the tar app --------------------------
cp docker-compose.yml bamvalidation_app
cp run_all.sh bamvalidation_app

tar -czvf bamvalidation_app.tar.gz bamvalidation_app
rm -r bamvalidation_app
mv bamvalidation_app.tar.gz bamvalidation_installation


# -------------------------- create the app installation folder --------------------------
cp install_app.sh bamvalidation_installation
tar -czvf bamvalidation_installation.tar.gz bamvalidation_installation
rm -r bamvalidation_installation
mv bamvalidation_installation.tar.gz ~/
