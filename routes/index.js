const Axios = require('axios');
const schemas = require('../schema');
/*
  Auth functions for use in routes
  const auth = require('../lib/passport');
  promises with errs:
  auth.register(username, pass);
  auth.login(username, pass);
  return auth tokens, on auth, check req.user for user status, pass in header:
  Authorization: `JWT <token goes here`
*/

/* import schemas in routes

const Test = schemas.Test;

*/

// Schemas


module.exports = (router) => {

  console.log('setting routes');
  router.get('/test', async (req, res, next) => {
    const reg = await auth.login('neil1', 'password1');
    console.log(reg);
    res.send('hello');
  });

  /* import routes
    eg. require('./routepath')(router);

    // get route
    router.get('/test', (req, res) => {

      // return res.json - json, res.send plain text
      return res.json({success: true, data: 'something'});
    })

    // get route with params
    router.get('/input/:slugInput', (req,res) => {

      // create new object
      const newEntry = new DiscoDildo();

      // set params according to schema
      newEntry.name = req.params.slugInput;
      newEntry.slug = req.params.slugInput;

      // saving object in db
      newEntry.save(()=>{
        return res.send('Saved');
      });

    })

    router.get('/output', async (req, res) => {

      // search in db with promise
      const results = await DiscoDildo.find({key: value});
      return res.json({success: true, results: results});
    })

*/
}
