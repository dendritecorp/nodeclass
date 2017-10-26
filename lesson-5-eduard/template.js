
const fs = require ('fs');
const AllTweetsTemplate =  './public/index.hbs'
const OneTweetTemplate =  './public/tweet.hbs'
const Handlebars = require('handlebars');

const Template = {};
module.exports = Template;

Template.allTweets = (response, data) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(AllTweetsTemplate, 'utf-8', function(error, source){
      if (error) return reject(error)
      var template = Handlebars.compile(source);
      if(data.toString()){
        var html = template({tweets: data});
      } else {
        var html = template({})
      }
      return resolve(html)
    })
  })
}

Template.oneTweet = (foundTweet) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(OneTweetTemplate, 'utf-8', function(error, source){
      if (error) return reject(error)
      const template = Handlebars.compile(source)
      let html = template({tweets: foundTweet})
      return resolve(html)
    })
  })
}
