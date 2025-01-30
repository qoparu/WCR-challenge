# Use the lightweight Alpine Linux as the base image
FROM alpine:latest

# Install necessary libraries, bash, and curl
RUN apk add --no-cache bash curl libstdc++ libgcc

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL=/root/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH

# Verify Bun installation
RUN bun --version

# Set the working directory
WORKDIR /app

# Copy your application code to the container
COPY . .

# Install dependencies using Bun
RUN bun install

# Expose the port Bun will use (adjust if needed)
EXPOSE 3030

# Command to run the development server
CMD ["bun", "start"]