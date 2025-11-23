FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Run the build command as part of the development stage
RUN npm run build 

# EXPOSE and CMD are used when the container starts up from this stage
EXPOSE 3000

CMD ["npm", "run", "dev"]