# Base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project
COPY . .

# Set the port number the container should expose
EXPOSE 3000

# Command to start the app
CMD [ "npm", "run", "dev" ]