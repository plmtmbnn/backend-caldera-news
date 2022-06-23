import express from 'express';
const router = express.Router();

// Controller
import { categoryController } from '../controller/CategoryController';

router.get('/', categoryController.getCategory);

export default router;
