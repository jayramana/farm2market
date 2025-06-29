FROM node:current-alpine3.22

#Create working directory inside the docker container
WORKDIR /f2m

#Copy dependencies from package.json

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
