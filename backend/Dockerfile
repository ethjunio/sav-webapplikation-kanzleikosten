# Stage 1: Build the frontend
FROM node:18-alpine AS build-frontend

# Set working directory
WORKDIR /app/frontend

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm ci --silent

# Copy frontend source code
COPY ./frontend ./

# Build the frontend
RUN npm run build

# Stage 2: Set up the backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install backend dependencies
COPY ./backend/package*.json ./
RUN npm ci --only=production --silent

# Copy the backend source code
COPY ./backend ./

# Copy the build files from the frontend stage to the public directory
COPY --from=build-frontend /app/frontend/build ./public

# Expose the backend port
EXPOSE 5500

# Define environment variables (optional)
ENV NODE_ENV=production

# Command to run the backend server
CMD ["npm", "start"]