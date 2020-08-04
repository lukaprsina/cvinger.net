#!/bin/bash

git status
printf "Commit message: "
read msg

git add .
git commit -m "$msg"
git push
