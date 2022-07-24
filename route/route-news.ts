import express from 'express';
const router = express.Router();

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { newsController } from '../controller/NewsController';

router.post('/upsert', isLoggedIn, newsController.upsertNews);
router.get('/show/:news_url', newsController.getNews);
router.post('/list', newsController.getNewsList);

router.get('/like/get/:news_id', newsController.getLikes);
router.post('/like/upsert', isLoggedIn, newsController.upsertLike);

router.get('/comment/get/:news_id', newsController.getComment);
router.post('/comment/upsert', isLoggedIn, newsController.upsertComment);

export default router;