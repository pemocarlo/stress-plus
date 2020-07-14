# Deploying

The easiest way to deploy Stress+ is using a Docker container. Do build the Docker image a Dockerfile is present in the root directory. The Dockerfile will build the frontend and configure the backend to also serve the frontend. By default the backend will listen on Port 80. If you want to change the port set the `PORT` environment variable. The backend requires a running MongoDB database, therefore set the `MONGODB_URI` environment variable. The value should have the following schema `mongodb://<username>:<password>@<host>:<port>/<database-name>`.

## Deploying to [Heroku](https://www.heroku.com/home)
Deploying to Heroku is supported out of the box. It is configured in the `heroku.yml` file and also uses the above mentioned Dockerfile.
To deploy to Heroku the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) must be installed and you must have an account for Heroku.
When creating a Heroku App, a new git remote `heroku` is added to which you can push your code and then Heroku will start to deploy the new version of your app.

All following commands assume you have installed the Heroku CLI and have logged in successfully with `heroku login`.

### Setup
- `heroku create --region eu --stack container stress-plus` Create a new heroku app with the name `stress-plus`
- `heroku addons:create mongolab:sandbox -a stress-plus --name database-name` Add a MongoDB database with name `database-name` to the `stress-plus` App. This command will automatically set the environment variable `MONGODB_URI` on the `stress-plus` App.
- For local development the `MONGODB_URI` must be set manually in the `.env` or `.env.local` file. The `.env` file is commited to git therefore do not specifiy the production database here. But you can create a second database with the command above and use it for development. 
- The `PORT` environment variable is set by Heroku automatically

### Deploy
To deploy your code from master branch run `git push heroku master`. If you want to deploy from the branch `branch-name`, run `git push heroku branch-name:master`
