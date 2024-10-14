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

## AFTER UPDATING CODES AND BEFORE PUSH AND DEPLOY FRONTEND: 

--Stage and commit your changes in dev branch:

    git add .
    git commit -m '<your-comment>'

--Sync dev with the remote:

    git checkout dev
    git pull origin dev
    git push origin dev

--Switch to main branch and sync it with remote:

    git checkout main
    git pull origin main

--Merge dev into main:

    git checkout main
    git merge dev

-- navigate to frontend folder to build and commit:

    npm run build 
    git add .
    git commit -m '<your-comment>'
    git push origin main

--add a ! before dist in your frontend .gitignore



## Miscellaneous
``` bash
git status
git branch
npx dotenv sequelize-cli db:seed:undo:all
npx dotenv sequelize-cli db:migrate:undo:all
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:seed:all
```
