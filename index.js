const express = require('express');
let cors = require('cors')
const app = express();
const {Octokit}=require("@octokit/rest");
const { asyncHandler } = require("./middleware");
const {
  createOAuthAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");
const { Router } = require("express");
const { encryptToken, decryptToken } = require("./crypto");
const router=Router();
const clientId = 'a727daaaf35737b322cb';
const clientSecret = '37f2a8358ed451f294626c6835982ce35a39dfce';


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cors({ origin: "https://bitzz.netlify.app", credentials: true }));


app.get('/lol', (req, res) => {

    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);


});

app.listen(3000);
console.log('App listening on port 3000');

const axios = require('axios');
let access_token = "";

app.get('/oauth-callback', (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: 'application/json' } };

 
 
  axios.post(`https://github.com/login/oauth/access_token`, body, opts).
  then((response) => {
    
    access_token = response.data.access_token;
    res.redirect('https://bitzz.netlify.app/dashboard');
 // res.send("<h1>Bien hecho!!</h1>")
  }).
    catch(err => res.status(500).json({ message: err.message }));

   /* const appAuth = createOAuthAppAuth({
      clientType: "oauth-app",
      clientId:clientId,
      clientSecret: clientSecret,
    });
  
    const userAuth = await appAuth({
      type: "oauth-user",
      code: body.code,
      factory: createOAuthUserAuth,
    });
    const authentication = await userAuth();
    const { token } = authentication;*/
    

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
     
     
    
    })
  });

  app.get("/cb", asyncHandler(async (req, res, next) => {

      res.redirect(`https://bitzz.netlify.app`);
    })
  );



  app.get("/logout", async (req, res) => {
    /* get the encrypted toke from the req cookies
      const encryptedToken = req.cookies.session_id;
      
      const token = decryptToken(encryptedToken, secret_key);*/
     
      // app authentication
      const appOctokit = new Octokit({
        authStrategy: createOAuthAppAuth,
        auth: {
          clientId: clientId,
          clientSecret: clientSecret,
        },
      });
  
      // revoke user's access token
      await appOctokit.request("DELETE /applications/{client_id}/grant", {
        client_id: clientId,
        access_token: access_token,
      });
    
      // redirect user to home page
      res.redirect(`https://bitzz.netlify.app/`);
    })
  
  
   


  /*
   const auth = createTokenAuth(access_token);
    const authentication = await auth();


     res.send(authentication)
  
  axios({
      method: 'get',
      url: `https://api.github.com/applications/a727daaaf35737b322cb/token`,
      headers: {
        Authorization: 'token ' + access_token
      }
    }).then((response) => {
     
      res.redirect("http://localhost:4200")
    })
     const octokit = new Octokit({
      
      auth: access_token })

     await octokit.request('DELETE /applications/{client_id}/token', {
        
        client_id: 'a727daaaf35737b322cb',
        access_token: access_token 
     })
     
      const result=   await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "dumbsito",
      repo: "notes-app",
    });
    try{
     const octokit = new Octokit({
      auth: access_token
    });

 
  await octokit.request('DELETE /applications/{client_id}/token', {
      client_id: 'a727daaaf35737b322cb'
   })
  }catch(err){
    console.log("el error es", err);
  }*/

    
 




  /*
  const octokit = new Octokit({ auth: 'YOUR-TOKEN' }) await octokit.request('DELETE /applications/{client_id}/grant', { client_id: 'Iv1.8a61f9b3a7aba766', access_token: 'e72e16c7e42f292c6912e7710c838347ae178b4a' })
  const octokit = new Octokit({ auth: 'YOUR-TOKEN' }) await octokit.request('DELETE /applications/{client_id}/token', { client_id: 'Iv1.8a61f9b3a7aba766', access_token: 'e72e16c7e42f292c6912e7710c838347ae178b4a' })
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
    url: `https://github.com/settings/connections/applications/a727daaaf35737b322cb`,
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




/*  router.get("/logout",


    asyncHandler(async (req, res, next) => {
      // get the encrypted toke from the req cookies
      const encryptedToken = req.cookies.session_id;
      const token = decryptToken(encryptedToken, process.env.SECRETE_KEY);
  
      // app authentication
      const appOctokit = new Octokit({
        authStrategy: createOAuthAppAuth,
        auth: {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRETE,
        },
      });
  
      // revoke user's access token
      await appOctokit.request("DELETE /applications/{client_id}/grant", {
        client_id: clientId,
        access_token: token,
      });
    
      // redirect user to home page
      res.redirect(`${process.env.CLIENT_URL}`);
    })
   
)*/