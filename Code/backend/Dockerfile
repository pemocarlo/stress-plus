# Build the final bundle in the separate builder container
FROM node:12 as builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install dependencies
RUN npm ci

# Build app
RUN npm run build

# This is the final container
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to final container
COPY package*.json ./

# Install all production dependencies
RUN npm ci --only=production

# Copy the created server bundle
COPY --from=builder /usr/src/app/build/server.js .

CMD [ "node", "server.js" ]
