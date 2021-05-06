# NodeDocker
A simple express app 


## Docker Usage

- [Node Image](https://hub.docker.com/_/node)

- build ```docker build -t node-app-image .```
- run ```docker run --name node-app -d -p 3000:3000 node-app-image```
    - you can remove by: ```docker rm node-app -f```
- inspect contents: ```docker exec -it node-app bash```