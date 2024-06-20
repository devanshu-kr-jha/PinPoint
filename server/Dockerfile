
# Use the Node.js image as base
FROM node:20.7.0

# Set the working directory inside the container
WORKDIR /app

# Copy both package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install all dependencies, including dev dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app
CMD ["node", "index.js"]

