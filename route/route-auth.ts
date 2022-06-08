import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();
const passport = require('passport');

import { isLoggedIn } from '../midleware/middleware';

// Controller
import { authController } from '../controller/AuthController';

router.get("/fail", isLoggedIn, (req: Request, res: Response) => {
  res.send("Failed attempt");
});

router.get('/login', isLoggedIn, authController.login);

// facebook auth stuff ==========================================================
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/login/facebook/callback',
  passport.authenticate("facebook", {
    successRedirect: "/auth/login",
    failureRedirect: "/auth/fail"
  })
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// ============================================================================

export default router;
