FROM docker:20.10.7

# Install additional dependencies if needed
RUN apk update && \
    apk add --no-cache \
        curl \
        docker-compose

# Set the working directory
WORKDIR /app

# Copy your docker-compose.yml file into the container
COPY docker-compose.yml .

# Ensure Docker socket is accessible
VOLUME /var/run/docker.sock

# Define the command to run your application using docker-compose
CMD ["docker-compose", "up", "-d"]