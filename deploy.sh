set -e

npm run build

cd dist

# if you use custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git remote add origin git@github.com:tltary/memory-card-game-demo.git
git branch -M main
git push -u origin main

cd -