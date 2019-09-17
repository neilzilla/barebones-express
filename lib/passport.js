const bcrypt = require('bcrypt');
const schemas = require("../schema");
const jwt  = require('jsonwebtoken');

const UserAuth = schemas.Auth;
const jwts = 'tfltest';

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try{
        UserAuth.findOne({username: username}, (err, data) =>{
          if(data) return done(null, false, {message: 'Username already taken.'});
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashed => {
            let newUser = new UserAuth();
            newUser.username = username;
            newUser.password = hashed;
            newUser.save(err => {
              if(err) return done(null, false, {message: 'Error Saving'})
              return done(null, newUser)
            })
          })
        });
      } catch(err) {
        return done(err);
      }
    }
  )
)
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try{
        UserAuth.findOne({username: username}, (err, data) =>{
          if(err) return done(null, false, {message: err});
          if(!data) return done(null, false, {message: 'Username doesn\'t exist'});
          bcrypt.compare(password, data.password).then(result => {
            if(result !== true) return done(null, false, {message: 'Password doesn\'t match'});
            return done(null, data);
          });
        });
      } catch(err) {
        return done(err);
      }
    }
  )
)

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwts
}

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    UserAuth.findOne({_id: jwt_payload.id}, (err, data) => {
      if(data){
        done(null, data);
      }else{
        done(null, false);
      }
    })
  })
)

const register = (username, password) => {
  return new Promise((res, rej)=>{
    try{
      UserAuth.findOne({username: username}, (err, data) =>{
        if(data) return rej({success: false, message: 'Username taken'});
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashed => {
          let newUser = new UserAuth();
          newUser.username = username;
          newUser.password = hashed;
          newUser.save(err => {
            if(err) return rej({success: false, message: 'Error Saving', error: err})
            return res({success: true, user: newUser});
          })
        })
      });
    } catch(err) {
      return rej({success: false, message: 'Unknown Error', error: err});
    }
  });
}

module.exports = {
  checkToken: (req, res, next) => {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
      req.user = user;
      next();
    })(req, res);
  },
  register: register,
  login: (username, password) => {
    return new Promise((res, rej) => {
      try{
        UserAuth.findOne({username: username}, (err, data) =>{
          if(err) return rej({success: false, error: err});
          if(!data) return rej({success: false, message: 'Username doesn\'t exist'});
          bcrypt.compare(password, data.password).then(result => {
            if(result !== true) return rej({success: false,message: 'Password doesn\'t match'});
            const token = jwt.sign({id: data._id}, jwts);
            return res({success: true, token: token, user: data});
          });
        });
      } catch(err) {
        return done(err);
      }
  });

  }
}
