@echo off
set /p id="Commit message: "

git add .
git commit -m %id%
git push

pause