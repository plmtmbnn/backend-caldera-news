import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();

// Controller
import { authController } from '../controller/AuthController';


router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// ============================================================================

export default router;
