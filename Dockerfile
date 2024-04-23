FROM node:14.17.6

ENV NODE_ENV=development

RUN mkdir -p /home/restify/pids-service
WORKDIR /home/restify/pids-service

#COPY ["package.json", "package-lock.json*", "./"]
COPY . /home/restify/pids-service

EXPOSE 8000
RUN rm -rf node_modules||true
RUN npm cache clear --force 
RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]