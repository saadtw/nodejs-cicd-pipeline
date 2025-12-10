# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source code
COPY src/ ./src/

# Expose port 5000
EXPOSE 5000

# Set environment variable
ENV PORT=5000

# Command to run the application
CMD ["npm", "start"]