# Use an official Node.js image as the base image
FROM node:18.17.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
