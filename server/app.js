const express = require('express');
const app = express();

const request = require('request');
const bodyParser = require('body-parser');
const Twitter = require('twitter');

const CONSUMER_KEY = 'aduXEg4tLvqqZeB37JWEEpNPo';
const CONSUMER_SECRET = 'hA9iLFvutr4b0cgJgS7RsS8wtMHzzfNun0xYpiQuwglHQ58H58';
const ACCESS_TOKEN_KEY = '471474605-4PM5uIdgVwrCGrlKjssr8HPrX9Gdnudy2pXANOgn';
const ACCESS_TOKEN_SECRET = 'VcDOxXhjzX8bx8A7oTcFcmvCfaK03AiJ6SyJOsRow8nkc';

const twitterSearch = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
});

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser());

app.post('/twitter', (req, res) => {
  var tag = req.body.tag;
  twitterSearch.get('search/tweets', {q: `%23${req.body.tag}`, result_type:'recent', count:'100'}, (error, data, response) => {
    if(!error) {
      var bounds = [];
      data.statuses.map((status) => {
        if(status.user.geo_enabled && status.place !== null) {
          bounds.push(status.place.bounding_box.coordinates);
          //console.log(bounds);
        }
      });
      console.log(bounds);
      console.log("Sending bounds to React");
      res.send(bounds);
    }
  })
});

app.listen(1337, () => {
  console.log("App has started");
});
