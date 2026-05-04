FROM node:25.9-alpine AS builder
WORKDIR /srv/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

FROM node:25.9-alpine AS runtime
WORKDIR /srv/app
RUN apk add --no-cache curl 
COPY --from=builder /srv/app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

ENV NODE_ENV=production
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:3000/health || exit 1
CMD [ "node", "dist/src/main.js" ]