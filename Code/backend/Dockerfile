FROM node:12-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install dependencies
RUN npm ci

# Build app
RUN npm run build


FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build/server.js .

CMD [ "node", "server.js" ]
