import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();

const passport = require('passport');


// Controller
import { categoryController } from '../controller/CategoryController';
import { authController } from '../controller/AuthController';

// middleware

// health check endpoint
router.get(['/health', '/'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend API is live.'
  });
});

function isLoggedIn(req: Request, res: Response, next: NextFunction) {    
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get("/fail", isLoggedIn, (req: Request, res: Response) => {
  res.send("Failed attempt");
});

router.get("/profile", isLoggedIn, (req: Request, res: Response) => {
  const currentSession: any = req.session;
  const { user } = currentSession.passport;
  console.log('user', user.displayName);
  
  
  res.send("Success");
});


//auth
router.get('/auth/login', authController.login);

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/login/facebook/callback',
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/fail"
  })
);

router.get('/logout', (req: Request, res: Response) => { 
  req.logout();
  res.redirect('/');
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
