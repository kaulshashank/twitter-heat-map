const express = require('express');
const app = express();

const request = require('request');
const bodyParser = require('body-parser');
const Twitter = require('twitter');

const CONSUMER_KEY = 'nope';
const CONSUMER_SECRET = 'nope nope';
const ACCESS_TOKEN_KEY = 'nope nope nope';
const ACCESS_TOKEN_SECRET = 'nopety nope';

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
