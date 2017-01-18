#!/bin/bash
current_branch=$(git rev-parse --abbrev-ref HEAD)

git checkout -B heroku
npm run client:build
git add -f client/build
git commit -m'Deploy to Heroku'
git push -f heroku HEAD:master
git checkout $current_branch
