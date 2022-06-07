import router from './route';
import cors from 'cors';
import express from 'express';

import session from 'express-session';
import passport from 'passport';

const FacebookStrategy = require('passport-facebook').Strategy;

class App {
  app: any;

  constructor() {
    this.app = express().disable('x-powered-by');
    this.config();
  }

  async config(): Promise<void> {
    try {
      this.app.use(cors());
      this.app.use(express.json({ limit: '100mb' }));
      this.app.use(express.urlencoded({ extended: true, limit: '100mb' }));

      this.app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET'
      }));

      this.app.use(passport.initialize());
      this.app.use(passport.session());

      passport.serializeUser(function (user, cb) {
        cb(null, user);
      });

      passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
      });

      passport.use(new FacebookStrategy({
        clientID: '400441938763292',
        clientSecret: '8d34b75e1873070e04cb4929c810414a',
        callbackURL: 'http://localhost:2404/auth/login/facebook/callback'
      }, function (accessToken, refreshToken, profile, callback) {
        return callback(null, profile);
      }
      ));

      this.app.use('/', router);
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default new App().app;
