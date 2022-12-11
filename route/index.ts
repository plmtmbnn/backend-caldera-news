import { Request, Response } from 'express';
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
router.get('/meta/share-link/:news_url', categoryController.getMetaTagShareLink);

router.get('/origin-author', originAuthorController.getOriginAuthor);
router.post('/origin-author/upsert', originAuthorController.upsertOriginAuthor);

router.get('/tag', tagController.getTagList);
router.post('/tag/upsert', tagController.upsertTag);

router.get('/tag-mapping/:news_id', tagController.getTagMappingList);
router.post('/tag-mapping/upsert', tagController.upsertTagMapping);

export default router;
