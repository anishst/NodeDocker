# DevOps with Node and Docker
A simple express app to test out DevOps best practices

Uses below:
- [Node JS](https://nodejs.org/en/)
- [express](https://expressjs.com/)
- [mongo db](https://www.mongodb.com/)
- [mongo express](https://github.com/mongo-express/mongo-express) - db admin console
- [mongoose](https://www.npmjs.com/package/mongoose)
    - ```npm install mongoose```
## Docker Usage

- [Node Image](https://hub.docker.com/_/node)
- [Mongo Image](https://hub.docker.com/_/mongo)
    - inspect: ```docker exec -it nodedocker_mongo_1 bash```
        -  commands
            - connect: ```mongo -u "anish" -p "mypassword"```
            - list dbs: ```show dbs```
            - create db: ```use mydb```
            -  db.books.insert({"name": "Python"})
            - db.books.find()
    - connect quickly: ```docker exec -it nodedocker_mongo_1 mongo -u "anish" -p "mypassword" ```

- build ```docker build -t node-app-image .```
- run ```docker run --name node-app -d -p 3000:3000 node-app-image```
    - you can remove by: ```docker rm node-app -f```
- run with bind mount to see changes in app in real time:
    - windows cmd: ```docker run --name node-app -d -v %cd%:/app -p 3000:3000 node-app-image```
    - windows powershell: ```docker run --name node-app -d -v ${pwd}:/app -p 3000:3000 node-app-image```
    - Linux: ```docker run --name node-app -d -v $(pwd):/app -p 3000:3000 node-app-image```
    -  make sure to install nodemon as well ```npm install nodemon --save-dev``` and add this to package.json
        ```
            "scripts": {
            "start": "node index.js",
            "dev": "nodemon index.js" // if windows try with -L flag if error
            }
        ```
    - if you don't have local node_modules folder then use:
        ```docker run --name node-app -d -v $(pwd):/app -v /app/node_modules -p 3000:3000 node-app-image```
    - OPTIONAL to make app volume read-only:  ```docker run --name node-app -d -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 node-app-image```
### Port Mapping
- If you need to change default port of node app to 4000: ``` docker run --name node-app -v $(pwd):/app -v /app/node_modules --env PORT=4000 -d -p 3000:4000 node-app-image```
- read port from .env file: 
- If you need to change default port of node app to 4000 using env file: ``` docker run --name node-app -v $(pwd):/app -v /app/node_modules --env-file ./.env -d -p 3000:4000 node-app-image```
    - to verify: ```docker exec -it node-app bash``` and they use ```printenv``` to see the port var
### Inspect Contents
- inspect contents: ```docker exec -it node-app bash```

### using docker compose

- run app: ```docker-compose up -d```
- rebuild image and run app : ```docker-compose up -d --build```
- remove app and volumes: ```docker-compose down -v```

## Using docker compose with multiple compose files

### For Development
- run app for development; you can make live edits with this one: 
- run: ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d```
- stop: ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml down```
- prune unused volumes: ``` docker volume prune```
- you can view mongo express here: [http://localhost:8081/](http://localhost:8081/)

### For Production
- run app for prod env: 
- run: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```
- run with forcing a new image build: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build```
- stop: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v```
## Video Tutorial

- [DevOps with Docker](https://www.youtube.com/watch?v=9zUHg7xjIqQ)