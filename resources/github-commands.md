# Common Git Commands

git branch
    - git checkout -b dev
git status

<!-- Create a Branch -->
Step 1: git checkout dev
Step 2: git pull origin dev
Step 3: git checkout -b <your-branch-name>

<!-- START CODING: PULL FROM GITHUB into LOCAL BRANCH-->
Step 1: git checkout dev
Step 2: git pull origin dev
Step 3: git checkout <your-branch-name>
Step 4: git merge dev

<!-- END CODING: PUSH TO LOCAL -->
Step 1: git add .
Step 2: git commit -m 'Comment Here'
Step 3: git push origin <your-branch-name>

<!-- END CODING: PUSH TO GITHUB from LOCAL BRANCH-->
Step 1: git checkout dev
Step 2: git pull origin dev
Step 3: git merge <your-branch-name>
Step 4: git push origin dev

