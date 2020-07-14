# Build the final bundle in the separate builder container
FROM node:12 as builder

# Create app directory and copy source code into container
WORKDIR /stress-plus
COPY . ./

# Build the backend
WORKDIR /stress-plus/Code/backend
RUN npm ci && npm run build

# Build the frontend
WORKDIR /stress-plus/Code/frontend
RUN npm ci && npm run build

# This is the final container
FROM node:12

# Create app directory
WORKDIR /stress-plus

# Copy backends package.json and package-lock.json to final container and install the production dependencies
COPY Code/backend/package*.json ./
RUN npm ci --only=production

# Copy the created backend and frontend files
COPY --from=builder /stress-plus/Code/backend/build/server.js ./
COPY --from=builder /stress-plus/Code/frontend/build www/

ENV NODE_ENV=production
CMD ["node", "server.js"]
