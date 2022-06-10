import express from 'express';
const router = express.Router();

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { newsController } from '../controller/NewsController';

router.post('/upsert', newsController.upsertNews);
router.get('/show/:news_url', newsController.getNews);

export default router;
