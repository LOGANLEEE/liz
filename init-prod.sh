#!/bin/bash

git pull
yarn 
yarn generate-prod
yarn pull-prod
yarn builld
yarn start