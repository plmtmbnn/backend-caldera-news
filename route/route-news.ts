import express from 'express';
const router = express.Router();

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { newsController } from '../controller/NewsController';

router.get('/upsert', isLoggedIn, newsController.upsertNews);
router.get('/show/:news_url', newsController.getNews);

export default router;
