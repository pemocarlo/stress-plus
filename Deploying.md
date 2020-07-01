# Deploying to Heroku
Currently this project is setup to be deployed to [Heroku](https://www.heroku.com/home).
To deploy to Heroku the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) must be installed and you must have an account for Heroku.
Unfortunatly Heroku has no monorepo support out of the box, as one deployment is linked to one heroku git repository. By default heroku provides a new git remote to which you can push your code and then it will start to deploy a new version of your app. The current setup uses two separate heroku apps (one for the frontend and one for the backend). Therefore we have two new git remotes `heroku-frontend` and `heroku-backend` to which we must push in order to start the respective deployment.

All following commands assume you have installed the Heroku CLI and have logged in successfully with `heroku login`. Note as we have multiple heroku apps we always need to specify the app name with the `-a app-name` option.

## Frontend
The frontend uses the default Heroku Stack with two [buildpacks](https://devcenter.heroku.com/articles/buildpacks) to simplify the deployment.

### Setup
- `heroku create --remote heroku-frontend --region eu stress-plus` Create a new heroku app with the name `stress-plus`
- `heroku buildpacks:add -a stress-plus --index 1 https://github.com/lstoll/heroku-buildpack-monorepo.git` Add a buildpack to support monorepo
- `heroku buildpacks:add -a stress-plus--index 2 mars/create-react-app` Add a buildpack to deploy a create-react-app
- `heroku config:set -a stress-plus APP_BASE=Code/frontend/` Tell the heroku-buildpack-monorepo where the frontend code is
- `heroku config:set -a stress-plus API_URL=https://stress-plus-backend.herokuapp.com` Tell the frontend reverse proxy where to forward the api calls to

### Deploy
To deploy your code from master branch run `git push heroku-frontend master`. If you want to deploy the branch `branch-name`, run `git push heroku-frontend branch-name:master`

## Backend
The backend uses the Heroku container stack to deploy a docker container. Here the `heroku.yml` file specifies the Dockerfile from which the container is creates.

### Setup
- `heroku create --remote heroku-frontend --region eu --stack container stress-plus-backend` Create a new heroku app with the name `stress-plus-backend`

### Deploy
To deploy your code from master branch run `git push heroku-backend master`. If you want to deploy the branch `branch-name`, run `git push heroku-backend branch-name:master`
