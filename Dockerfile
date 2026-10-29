# Builds the Design Harness static app and serves it with nginx on :8080.
# The image is a read-only viewing copy: the settings and usage endpoints only
# exist in `npm run dev`, so nothing in it writes files.
#
#   docker build -t design-harness .
#   docker run --rm -p 8080:8080 design-harness
#
# Licensed webfonts in public/fonts/ are gitignored. Without them the app uses
# its default type stack (see public/fonts/README.md).

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build && test -f dist/index.html

FROM nginx:1.27-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
