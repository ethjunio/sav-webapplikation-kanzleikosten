# Use the official Node.js LTS version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (default is 3000 for React apps)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]