//route
import router from './route';
import authRoute from './route/route-auth';
import newsRoute from './route/route-news';
import categoryRoute from './route/route-category';

import cors from 'cors';
import express from 'express';

import fs from 'fs';

class App {
  app: any;

  constructor() {
    this.app = express().disable('x-powered-by');
    this.config();
  }

  async config(): Promise<void> {
    try {
      this.app.use(cors());
      this.app.use(express.json({ limit: '100mb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '100mb' }));

      this.app.use('/auth', authRoute);
      this.app.use('/news', newsRoute);
      this.app.use('/category', categoryRoute);
      
      this.app.use('/', router);

      var avatarDir = './image/avatar';
      var newsDir = './image/news';

      if (!fs.existsSync(avatarDir)){
          fs.mkdirSync(avatarDir, { recursive: true });
      }
      if (!fs.existsSync(newsDir)){
          fs.mkdirSync(newsDir, { recursive: true });
      }
    } catch (error) {
      console.log('[App][config] error:', error);
    }
  }
}

export default new App().app;
