FROM node:15
WORKDIR /app
# Copy package json only; this is to use caching in docker
COPY package.json .
# install packages based on environment
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
# copy all files to WORKDIR
COPY . ./
# only for documenation; does not open 3000
ENV PORT 3000
EXPOSE ${PORT}
# CMD ["npm", "index.js"]
# run using nodemon script specified in package.json
CMD ["node", "index.js"]