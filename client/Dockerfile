# Use a specific node version
FROM node:20.7.0-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code to the working directory
COPY . .

# Build the Vite app
RUN npm run build

# Use nginx as base image to serve the build artifacts
FROM nginx

# Copy the build artifacts to Nginx's default public directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

