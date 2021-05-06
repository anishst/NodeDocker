FROM node:15
WORKDIR /app
# Copy package json only; this is to use caching in docker
COPY package.json .
# install packages
RUN npm install
# copy all files to WORKDIR
COPY . ./
# only for documenation; does not open 3000
EXPOSE 3000
# CMD ["npm", "index.js"]
# run using nodemon script specified in package.json
CMD ["npm", "run", "dev"]