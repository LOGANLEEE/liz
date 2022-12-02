#!/bin/bash

git pull
yarn 
yarn generate-prod
yarn pull-prod
yarn build