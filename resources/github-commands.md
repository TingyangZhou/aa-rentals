# Common Git Commands

git branch
    - git checkout -b dev
git status

<!-- Create a Branch -->
Step 1: git checkout dev
Step 2: git pull origin dev
Step 3: git checkout -b <your-branch-name>

<!-- START CODING: When Pulling from dev to your branch -->
Step 1: git checkout dev
Step 2: git pull origin dev
Step 3: git checkout <your-branch-name>
Step 4: git merge dev

<!-- END CODING: When Pushing from your branch to dev -->
Step 1: git checkout dev
Step 2: git pull origin dev
Step 3: git merge <your-branch-name>
Step 4: git push origin dev

