const fs = require ('fs');
const Handlebars = require('handlebars');
const allTweetsTemplate =  './public/index.hbs'
const oneTweetTemplate =  './public/tweet.hbs'

const Template = {};
module.exports = Template;

Template.allTweets = (response, data) => {
  fs.readFile(allTweetsTemplate, 'utf-8', function(err, source){
    if (err) throw err;
    var template = Handlebars.compile(source);
    if(data.toString()){
      var html = template({tweets: data});
    } else {
      var html = template({})
    }
    response.end(html)
  })
}
