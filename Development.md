# Development of Stress+
The Code for Stress+ is splitted into two parts, the backend and the frontend.

## Our development workflow
Please refer to the following steps every time you start developing a new feature.
1. The Frontend requires [NodeJS](https://nodejs.org/en/) to be installed on your computer (if you have already installed NodeJS, skip this step)
2. `git checkout master`
3. `git pull origin master`
4. Create a merge request from an issue in GitLab. Add the label `In Progress` to the corresponding issue. No need to add a label to the merge request at this step.
5. `git fetch`
6. `git checkout <branch-name>` Checks out the branch of the merge request created in step 4. `<branch-name>` must be replaced with the branch name of the merge request. The branch name will start with the corresponding issue number.
7. Run `npm install` in **both** the backend **and** the frontend folder to install or update all dependencies.
8. Run `npm run start` in **both** the backend **and** the frontend folder to start the local development environment
9. Develop our new feature
10. Run `npm run lint-fix` in the folder you have made changes to, so the code is formatted according to our code style.
11. Commit your changes
12. Push your changes with `git push origin <branch-name>`
13. Tag your merge request with the label `Waiting for review` and update the issue with the completed tasks. 
14. Wait for review and update your merge request if changes are requested. It will be indicated with the label `Review: Needs Change`.
15. IMPORTANT: Do not merge your changes into master on your own! Instead, after applying the requested changes, switch the label to `Waiting for review` again
16. If there are important new changes on master that you need in your implementation, or if there is a merge conflict (indicated by the reviewer):
    1. `git fetch origin master:master`
    2. `git rebase master`
    3. Resolve potential conflicts and check if your code still works.
    4. `git push origin <branch-name> --force-with-lease`
17. Once the branch is merged
    1. `git checkout master`
    2. `git branch -D <branch-name>`