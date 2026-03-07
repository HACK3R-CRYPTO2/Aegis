# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Next.js app (optional, but good practice to ensure everything is correct)
# RUN npm run build

# Start the Relayer
CMD ["npm", "run", "relay"]
