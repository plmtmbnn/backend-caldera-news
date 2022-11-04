import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { authController } from '../controller/AuthController';

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/password/update', authController.updatePassword);

router.post('/user/list', isLoggedIn, authController.listUser);
router.post('/user/update', isLoggedIn, authController.updateUserStatus);
router.post('/user/admin/add/:user_id', isLoggedIn, authController.addAsAdmin);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// ============================================================================

export default router;
