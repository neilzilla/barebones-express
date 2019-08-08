const Axios = require('axios');
//const qs = require('qs');
const schemas = require('../schema');
/*
var token = null;
var stateAuth = null
*/
const DiscoDildo = schemas.DiscoDildo;
/*
function auth(){
  if(!token){
    stateAuth = new Date().getTime() + 'test';
    return {success: false, redirect_url: `https://auth.monzo.com/?client_id=${process.env.MONZO_CLIENT}&redirect_uri=${process.env.SERVER_URL}/auth&response_type=code&state=${stateAuth}`};
  }
  return {success: true};
}
*/

module.exports = (router) => {
  // import routes

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
    const results = await DiscoDildo.find({});
    return res.json({success: true, results: results});
  })


/*
  router.get('/account', (req,res) => {
    const check = auth();
    if(!check.success){
      res.redirect(check.redirect_url);
      return;
    }
    Axios.get('https://api.monzo.com/accounts?account_type=uk_retail', {headers: {
      'Authorization': `Bearer ${token}`
    }})
      .then(resp =>{
        console.log(resp);
        res.json(resp.data);
      })
  });

  router.get('/auth', (req, res) => {
    console.log(req.query);
    if(req.query.code && req.query.state === stateAuth){
      console.log(req.query);

      const data = qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.MONZO_CLIENT,
        client_secret: "mnzconf.MiD8eOsEohOz3QeXfQuNBZIlwv0xFkG/zIDGK1XieVxjMTQLGTZ88JGeng9zG0eYexoM+Qje6Q+0pjIPv9sJ",
        redirect_uri: `${process.env.SERVER_URL}/auth`,
        code: req.query.code
      });

      Axios.post("https://api.monzo.com/oauth2/token",
        data,
        {headers:
          {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }
      )
        .then(resp =>{
          console.log(resp);
          token = resp.data.access_token;
          return res.send('authed');
        })
        .catch(err => {
          console.log(err);
        })
    }else{
      res.send('Not Authed')
    };
  });
  */
}
