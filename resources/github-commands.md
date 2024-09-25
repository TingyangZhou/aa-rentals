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

## Miscellaneous
``` bash
git status
git branch
npx dotenv sequelize-cli db:migrate
npx dotenv sequelize-cli db:migrate:undo:all
npx dotenv sequelize-cli db:seed:all
```
