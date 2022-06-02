const router = require('./route/Router');
var cors = require('cors');
var express = require('express');

class App {
    app: any;

    constructor () {
      this.app = express().disable('x-powered-by');
      this.config();
    }

    async config (): Promise<void> {
      this.app.use(cors());
      this.app.use(express.json({ limit: '100mb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '100mb' }));
      this.app.use('/', router);
    }
}

export default new App().app;
