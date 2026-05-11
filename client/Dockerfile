FROM node:18
WORKDIR /app

# The asterisk makes package-lock.json optional
COPY package*.json ./

# 'npm install' will generate the lock file if it's missing
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]