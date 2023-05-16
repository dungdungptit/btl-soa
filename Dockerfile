FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install --force

EXPOSE 8000
CMD [ "npm", "start" ]

# docker build -t dockerized-react .
# docker run -dp 3000:8000 dockerized-react
