**
git pull origin master && npm run build && rm -rf logs/ && pm2 delete backend-caldera && pm2 start app.config.js --env production && cd logs/
**