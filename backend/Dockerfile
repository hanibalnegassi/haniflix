FROM node:21-alpine3.18 AS builder


WORKDIR /app

COPY package*.json ./

RUN npm install sharp --ignore-engines
RUN npm install

FROM ghcr.io/puppeteer/puppeteer:21.9.0


USER root

# Add 'node' and 'pptruser' users to 'www-data' group
RUN adduser node www-data && adduser pptruser www-data


# Create directories
RUN mkdir -p /usr/movies /usr/app/uploads/avatars /usr/app/logs

# Change ownership and set permissions for directories
RUN chown -R pptruser:www-data /usr/app /usr/app/logs && \
    chmod -R 755 /usr/app /usr/movies /usr/app/uploads/avatars /usr/app/logs

# Adjust directory permissions
RUN chmod g+w /usr/app/uploads /usr/app/logs

# Switch back to the default user provided by the Puppeteer image
USER pptruser


WORKDIR /usr/app

COPY --from=builder /app .

# Start the application
CMD ["npm", "start"]