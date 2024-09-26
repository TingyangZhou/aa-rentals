# Common Git Commands


## Create a Branch
``` bash
git checkout dev
git pull origin dev
git checkout -b <your-branch-name>
```

## START CODING: PULL FROM GITHUB into LOCAL BRANCH
``` bash
git checkout dev
git pull origin dev
git checkout <your-branch-name>
git merge dev
```

## END CODING: PUSH TO GITHUB from LOCAL BRANCH
``` bash
git add .
git commit -m '<your-comment>'
git checkout dev
git pull origin dev
git merge <your-branch-name>
git push origin dev
```

## Auto-Merging Conflict
* Step 1: Click on 'Accept Both Changes'
* Step 2: Save conflicted file changes
* Step 3: 
``` bash
git add .
git commit -m '<your-comment>'
git push origin dev
```

## Miscellaneous
``` bash
git status
git branch
npx dotenv sequelize-cli db:seed:undo:all
npx dotenv sequelize-cli db:migrate:undo:all
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:seed:all
```
