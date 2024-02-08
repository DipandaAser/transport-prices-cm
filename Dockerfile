# build stage
FROM node:20.9 as build
LABEL dev="Aser <aserdipanda@gmail.com>"

RUN npm install -g pnpm

WORKDIR /app
# copy all the projet config files
COPY . .
# install dependencies
RUN pnpm install

# build the SvelteKit app
RUN pnpm run build

# expose the app's port
EXPOSE 3000

# run the server
CMD ["node", "-r", "dotenv/config", "build"]

