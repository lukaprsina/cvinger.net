#!/bin/sh

git status
printf "\n\nCommit message: "
read msg

git add .
git commit -m "$msg"
git push
