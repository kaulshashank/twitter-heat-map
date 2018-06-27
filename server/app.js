const express = require('express');
const app = express();

const request = require('request');
const bodyParser = require('body-parser');
const Twitter = require('twitter');

<<<<<<< HEAD
const MAPS_KEY = 'AIzaSyB9jczIiGXLjxzsDJkuzGb_d1EZyiRt7K4';
const CONSUMER_KEY = 'aduXEg4tLvqqZeB37JWEEpNPo';
const CONSUMER_SECRET = 'hA9iLFvutr4b0cgJgS7RsS8wtMHzzfNun0xYpiQuwglHQ58H58';
const ACCESS_TOKEN_KEY = '471474605-4PM5uIdgVwrCGrlKjssr8HPrX9Gdnudy2pXANOgn';
const ACCESS_TOKEN_SECRET = 'VcDOxXhjzX8bx8A7oTcFcmvCfaK03AiJ6SyJOsRow8nkc';
=======
const CONSUMER_KEY = '';
const CONSUMER_SECRET = '';
const ACCESS_TOKEN_KEY = '';
const ACCESS_TOKEN_SECRET = '';
>>>>>>> 47ed4a9a61c28939ad291a12b7e4e2ffcaadb19d

const twitterSearch = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/twitter', (req, res) => {
  console.log("body", req.body);
  var bounds = [];
  twitterSearch.get('search/tweets', {q: req.body.tag, result_type:'recent', count:'100'},
  (error, tweets, response) => {
    if(error) { console.log(error) }
    tweets.statuses.map(status => {
      if(status.user.geo_enabled && (status.geo !== null)) {
        console.log(status.geo.coordinates);
        bounds.push(status.geo.coordinates);
      }
    });
    console.log("Sending the above bounds...")
    res.send(bounds);
  })
});



app.listen(1337, () => {
  console.log("App has started");
});
