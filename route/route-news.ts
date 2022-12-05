import express from 'express';
const router = express.Router();

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { newsController } from '../controller/NewsController';

router.post('/upsert', isLoggedIn, newsController.upsertNews);
router.get('/show/:news_url', newsController.getNews);
router.get('/delete/:news_id', isLoggedIn, newsController.deleteNews);
router.get('/show/by-id/:id', newsController.getNewsById);
router.post('/list', newsController.getNewsList);

router.get('/like/get/:news_id', newsController.getLikes);
router.post('/like/upsert', isLoggedIn, newsController.upsertLike);

router.get('/comment/get/:news_id', newsController.getComment);
router.post('/comment/upsert', isLoggedIn, newsController.upsertComment);
router.get('/comment/delete/:id', isLoggedIn, newsController.deleteComment);

router.get('/image/:path_name/:file_name', newsController.getImage);
router.post('/image/upload', newsController.uploadImage);
router.get('/image-additional/:news_id', newsController.getImageByNewsId);

export default router;