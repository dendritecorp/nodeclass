
const fs = require ('fs');
const AllTweetsTemplate =  './public/index.hbs'
const OneTweetTemplate =  './public/tweet.hbs'
const Handlebars = require('handlebars');

const Template = {};
module.exports = Template;

Template.allTweets = (response, data) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(AllTweetsTemplate, 'utf-8', (error, source) => {
      if (error) return reject(error)
      const template = Handlebars.compile(source);
      if(data.toString()){
        data.map((tweet) => {
          tweet.tweet = decodeURIComponent(tweet.tweet)
          tweet.user = decodeURIComponent(tweet.user)
        });
        return resolve(template({tweets: data}));
      }
        return resolve(template({}))
    })
  })
}

Template.oneTweet = (foundTweet) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(OneTweetTemplate, 'utf-8', (error, source) => {
      if (error) return reject(error)
      foundTweet.tweet = decodeURIComponent(foundTweet.tweet)
      foundTweet.user = decodeURIComponent(foundTweet.user)
      const template = Handlebars.compile(source)
      return resolve(template({tweets: foundTweet}))
    })
  })
}
