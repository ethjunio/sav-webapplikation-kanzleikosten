# Stage 1: Build the frontend
FROM node:18-alpine AS build-frontend

# Set working directory
WORKDIR /app/frontend

# Copy frontend source code
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./

# Build the frontend
RUN npm run build

# Stage 2: Set up the backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package.json and package-lock.json files
COPY ./backend/package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the backend source code (excluding node_modules)
COPY ./backend ./

# Copy the build files from the frontend stage to the public directory
COPY --from=build-frontend /app/frontend/build ./public

# Expose the backend port
EXPOSE 5500

# Command to run the backend server
CMD ["npm", "start"]

