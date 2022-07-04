import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import {isLoggedIn} from '../midleware/middleware';

// Controller
import { categoryController } from '../controller/CategoryController';

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

// Return 404 to all unidentified path URLs
router.get('*', function (req: Request, res: Response) {
  res.status(404).json();
});
router.post('*', function (req: Request, res: Response) {
  res.status(404).json();
});

export default router;
