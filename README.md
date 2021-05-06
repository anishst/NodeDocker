# NodeDocker
A simple express app 


## Docker Usage

- [Node Image](https://hub.docker.com/_/node)

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
- inspect contents: ```docker exec -it node-app bash```

## Video Tutorial

- [DevOps with Docker](https://www.youtube.com/watch?v=9zUHg7xjIqQ)