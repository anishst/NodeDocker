# DevOps with Node and Docker
A simple express app to test out DevOps best practices

Uses below:
- [Node JS](https://nodejs.org/en/)
- [express](https://expressjs.com/)
- [mongo db](https://www.mongodb.com/)
- [mongo express](https://github.com/mongo-express/mongo-express) - db admin console
- [mongoose](https://www.npmjs.com/package/mongoose)
    - ```npm install mongoose```
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    - for password encryption in users api
    - ```npm install bcryptjs```
- [express-session](https://www.npmjs.com/package/express-session) 
    - [connect-redis](https://www.npmjs.com/package/connect-redis)
    - ```npm install redis connect-redis express-session```
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
- [Redis Image](https://hub.docker.com/_/redis)
    - to login: ```docker exec -it nodedocker_redis_1 bash```
    - use ```redis-cli``` to get into redis cli
    - to see keys: ```keys *```
    - example: ```1) "sess:Z1SoWgFRGL5u9U0xK1wX0X55TKnWI1DR"```
    - to get details on key: ```get 1) "sess:Z1SoWgFRGL5u9U0xK1wX0X55TKnWI1DR"```
        - result: 
            ```
            "{\"cookie\":{\"originalMaxAge\":30000,\"expires\":\"2021-05-10T13:26:40.508Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"_id\":\"60993375bb1356001fbe0aa1\",\"username\":\"anish2\",\"password\":\"$2a$12$hVpYN4t6G4pzh/Zdazj71.B.ebALoQvJNnkkdtYSt3gU2V/QnwVFq\",\"__v\":0}}"
            127.0.0.1:6379>
            ```
- [Nginx image](https://hub.docker.com/_/nginx)
    - for scaling application
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
- to test retry logic use this by only starting node-app:  ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --no-deps node-app```
- you can view mongo express here: [http://localhost:8081/](http://localhost:8081/)

### For Production
- run app for prod env: 
- run: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```
- run with forcing a new image build: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build```
- stop: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v```

## API tests

- Posts
    - route for API at: [http://localhost:3000/api/v1/posts](http://localhost:3000/api/v1/posts)
    - get : http://localhost:3000/api/v1/posts
    - new post: http://localhost:3000/api/v1/posts
        - from post man do POST request: Body> raw > json
            ```json
            {
                "title": "My node post",
                "body": "my node post body  "
            }
            ```
    - http://localhost:3000/api/v1/posts/6095cbd4fa2dc4001f1ae792
    - path test: http://localhost:3000/api/v1/posts/6095cf242731b80064119567
    - added login for all but get requests
        - from postman
            - do login request first
            - then post request
- User
    - route: [http://localhost:3000/api/v1/users](http://localhost:3000/api/v1/users)
    - signup: [http://localhost:3000/api/v1/users/signup](http://localhost:3000/api/v1/users/signup)
        - from post man:
            ```json
                {
                    "username": "anish",
                    "password": "pass"
                }
            ```
## Video Tutorial

- [DevOps with Docker](https://www.youtube.com/watch?v=9zUHg7xjIqQ)