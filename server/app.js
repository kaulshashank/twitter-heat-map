const express = require('express');
const app = express();

const request = require('request');
const bodyParser = require('body-parser');
const Twitter = require('twitter');

const CONSUMER_KEY = '';
const CONSUMER_SECRET = '';
const ACCESS_TOKEN_KEY = '';
const ACCESS_TOKEN_SECRET = '';

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
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(bodyParser.json());

app.post('/twitter', (req, res) => {
  console.log("REACHEDD")
  var tag = req.body.tag;
  twitterSearch.get('search/tweets', {q: tag, result_type:'recent', count:'100'}, (error, tweets, response) => {
    console.log("REACHED")
    if(!error) {
      var bounds = [];
      tweets.statuses.map((status) => {
                  console.log("BOUND: ")
        if(status.user.geo_enabled && status.place !== null) {
          bounds.push(status.place.bounding_box.coordinates);

          console.log(status.place.bounding_box.coordinates)
        }
      });
      res.send(bounds);
      bounds = [];
    }
  })
});

app.listen(1337, () => {
  console.log("App has started");
});
