const express = require('express');
var cors = require('cors')
const app = express();
const {Octokit}=require("@octokit/rest");
const {createOAuthAppAuth, createOAuthUserAuth,} = require("@octokit/auth-oauth-app");
const clientId = 'a727daaaf35737b322cb';
const clientSecret = '37f2a8358ed451f294626c6835982ce35a39dfce';


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





app.get('/lol', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

app.listen(3000);
console.log('App listening on port 3000');

const axios = require('axios');
var access_token = "";

app.get('/oauth-callback', (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: 'application/json' } };

  axios.post(`https://github.com/login/oauth/access_token`, body, opts).
  then((response) => {
    access_token = response.data.access_token
    res.redirect('http://localhost:4200/dashboard');
 // res.send("<h1>Bien hecho!!</h1>")
  }).
    catch(err => res.status(500).json({ message: err.message }));
    console.log(body.code)
});



  app.get('/userData', function(req, res) {
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
     
      res.json({ userData: response.data });
    
    })
  });

  app.get('/repos', function(req, res) {

    axios({
      method: 'get',
      url: `https://api.github.com/user/repos`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
     
      res.json({ userData: response.data });
    
    })
  });

  app.get('/starred', function(req, res) {

    axios({
      method: 'get',
      url: `https://api.github.com/user/starred`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
     
      res.json({ userData: response.data });
    
    })
  });

  app.get('/followers', function(req, res) {
    axios({
      method: 'get',
      url: `https://api.github.com/user/followers`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
     
      res.json({ userData: response.data });
    
    })
  });
           
  app.get('/following', function(req, res) {

    axios({
      method: 'get',
      url: `https://api.github.com/user/following`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
     
      res.json({ userData: response.data });
    
    })
  });

app.get("/logout", (req,res)=>{
  
 
  
  
res.redirect("http://localhost:4200")
})


  /*
  app.get('/success',(req, res) => {
   const headers= {
      Authorization: 'token ' + access_token
    }

   axios.get("https://api.github.com/user",headers)
   .then((response) => {
    //res.json({ ok: 1 });
       res.render('pages/success',{ userData: response.data });
    })
  });
  
   axios({
    method: 'delete',
    url: `http://localhost:3000/logout`,
    headers: {
      Authorization: 'token ' + access_token
    },
    data: {
      source: access_token
    }
  }).then((response) => {
      
    
    res.redirect("http://localhost:4200")
  })
  
  */

