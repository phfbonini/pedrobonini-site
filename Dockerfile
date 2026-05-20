# ---------- build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# install deps (cached layer)
COPY package*.json ./
RUN npm ci

# build site
COPY . .
RUN npm run build

# ---------- runtime stage ----------
FROM caddy:2-alpine AS runtime

# copy built static site
COPY --from=build /app/dist /usr/share/caddy

# copy caddy config
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443
