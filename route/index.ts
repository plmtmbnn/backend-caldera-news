import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();

// Controller
import { categoryController } from '../controller/CategoryController';

// health check endpoint
router.get(['/health', '/'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend API is live.'
  });
});

//category
router.get('/category/get/all', categoryController.getCategory);

// Return 404 to all unidentified path URLs
router.get('*', function (req: Request, res: Response) {
  res.status(404).json();
});
router.post('*', function (req: Request, res: Response) {
  res.status(404).json();
});

export default router;
