import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import {isLoggedIn} from '../midleware/middleware';

// Controller
import { categoryController } from '../controller/CategoryController';
import { originAuthorController } from '../controller/OriginAuthorController';
import { tagController } from '../controller/TagController';

// health check endpoint
router.get(['/health', '/'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend API is live.'
  });
});

router.get('/token/check', isLoggedIn, (req: Request, res: Response) => {  
  res.status(200).json({
    status: 'SUCCESS',
    message: 'SUCCESS'
  });
});

//category
router.get('/category/get/all', categoryController.getCategory);

router.get('/sync/db', categoryController.syncDatabase);

router.get('/meta/title/:news_url', categoryController.getMetaTagTitle);
router.get('/meta/image/:news_url', categoryController.getMetaTagImage);

router.get('/origin-author', originAuthorController.getOriginAuthor);
router.post('/origin-author/upsert', originAuthorController.upsertOriginAuthor);

router.get('/tag', tagController.getTagList);
router.post('/tag/upsert', tagController.upsertTag);

router.get('/tag-mapping/:news_id', tagController.getTagMappingList);
router.post('/tag-mapping/upsert', tagController.upsertTagMapping);

// Return 404 to all unidentified path URLs
router.get('*', function (req: Request, res: Response) {
  res.status(404).json();
});
router.post('*', function (req: Request, res: Response) {
  res.status(404).json();
});

export default router;
