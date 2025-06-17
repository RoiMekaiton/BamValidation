#!/bin/bash

mkdir ~/releases


# -------------------------- extract main app folder --------------------------
tar -xzvf bamvalidation_app.tar.gz
mv bamvalidation_app ~/releases

chmod +x ~/releases/bamvalidation_app/run_all.sh


# -------------------------- compress the docker images --------------------------
tar -xzvf ~/releases/bamvalidation_app/docker_images.tar.gz
mv ~/bamvalidation_installation/docker_images ~/releases/bamvalidation_app/
rm ~/releases/bamvalidation_app/docker_images.tar.gz


# -------------------------- load docker images --------------------------
docker load -i ~/releases/bamvalidation_app/docker_images/bamvalidation_backend.tar.gz
docker load -i ~/releases/bamvalidation_app/docker_images/bamvalidation_frontend.tar.gz
