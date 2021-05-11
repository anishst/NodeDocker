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
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
    - ```npm install cors```
    - to enable communication between domains
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

# Using docker compose with multiple compose files

## For Development
- run app for development; you can make live edits with this one: 
- run: ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d```
- when switching you might need to rebuild volumens: ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d -V```
- stop and remove volumes: ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v```
- to scale node app using nginx by running 2 instances: ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2```
    - you can monitor the logs and see requests being shared between the 2 new instances
- prune unused volumes: ``` docker volume prune```
- to test retry logic use this by only starting node-app:  ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --no-deps node-app```
- you can view mongo express here: [http://localhost:8081/](http://localhost:8081/)

## For Production
 
- make sure to set env vars needed. use this format in linux: ```export ENVAR=VALUE```
    - MONGO_USER
    - MONGO_PASSWORD 
    - SESSION_SECRET
    - MONGO_INITDB_ROOT_USER
    - MONGO_INITDB_ROOT_PASSWORD
    - you can store all these in an ```.env``` file in production server in a secure place to load and have it load on boot by putting in ```.profile``` file add a new line in ```nano ~/.profile``` file: ```set -o allexport; source /root/.env; set +o allexport```. these should now load automatically
        ```env
            NODE_ENV=production
            MONGO_USER=anish
            MONGO_PASSWORD=mypassword
            SESSION_SECRET=secret
            MONGO_INITDB_ROOT_USERNAME=anish
            MONGO_INITDB_ROOT_PASSWORD=mypassword
        ```

### Running on prod server using docker hub image

- Steps
    - on dev machine:
        1.  build node-app image for Prod env: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml build```
        2.  push image to docker hub: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml push```
    - on prod server:
        1. pull image: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull```
        2. run image: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```
### Building and running on prod server (not recommended)
- run: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```
- stop: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml down```
- for new code changes, run with forcing a new image build: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build```
- only rebuild node app: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app```
- force recreation of containers even when no change: ````docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate```


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
## Docker Swarm usage

- check if enabled: ```docker info```
    - to enable: ```docker swarm init```
-list services: ```docker service --help```
- [using with docker-compose usage](https://docs.docker.com/compose/compose-file/compose-file-v3/#deploy)
- deploy our app using swarm: ```docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml myapp ```
- list nodes: ```docker node ls```
- list stacks: ```docker stack ls```
- list services in stack: ```docker stack services myapp```
- list tasks in stack: ```docker stack ps myapp```
## Video Tutorial

- [DevOps with Docker](https://www.youtube.com/watch?v=9zUHg7xjIqQ)

## Tools

- [watchtower](https://github.com/containrrr/watchtower)
    - A container-based solution for automating Docker container base image updates. [see docs](https://containrrr.dev/watchtower/)