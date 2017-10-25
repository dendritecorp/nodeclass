const fs = require ('fs');
const Handlebars = require('handlebars');
const Database = require('./database')
const AllTweetsTemplate =  './public/index.hbs'
const OneTweetTemplate =  './public/tweet.hbs'
const tweetsDB = 'tweets.json'
const Utils = require('./utils')
const Template = require('./template.js')


// Run DB check
Database.tableCheck()
//

const Handlers = {};
module.exports = Handlers;

Handlers.handleEndpoints = (request, response) => {
  const { headers, method, url } = request
  const id = request.url.split('/')[3]

  if (url === '/favicon.ico'){
    response.end()
    return Promise.resolve()
  }
  else if(url === '/api/tweets' && method === 'POST'){
    return Database.apiAddTweets(request)
    .then(() => Utils.responseAddTweets(response))
  }
  else if (url === '/api/tweets' && method === 'GET'){
    return Database.read()
    .then((data) => Utils.responseGetAllTweets(response, data))
  }
  else if (url.startsWith('/api/tweets/')){
    switch(method){
      case 'GET':
        return Database.apiGetOneTweet(request)
        .then((tweet) => {
          if (tweet) {
            Utils.responseGetOneTweet(response, tweet)
          } else {
            Utils.responseTweetNotFound(response, id)
          }
        })
        break;
      case 'DELETE':
        return Database.apiDeleteTweet(request, id)
        .then((found) => {
          found ? Utils.responseDelete(response, id) : Utils.responseTweetNotFound(response, id)
        })
        break;
      case 'PUT':
      return Database.apiUpdateTweet(request)
      .then((found) => {
          found ? Utils.responseUpdate(response, id) : Utils.responseTweetNotFound(response, id)
      })
        break;
    }
  }
  else if (url === '/' && method === 'GET'){
    return Database.read()
    .then((data) => {
        Template.allTweets(response, data)
      })
  }
  else if(url.startsWith('/view/') && method === 'GET'){
    const tweetID = request.url.split('/')[2]
    let foundTweet = ''
    return Database.read()
    .then((data) => {
      if (data.toString()){
        JSON.parse(data).tweets.forEach((tweet) => {
          if (tweet.id == tweetID) foundTweet = tweet
        })
      }
    })
    .then(() => {
      if (foundTweet){
        fs.readFile(OneTweetTemplate, 'utf-8', function(err, source){
          if (err) throw err;
          const template = Handlebars.compile(source);
          const html = template({tweets: foundTweet})
          Utils.responseWebShowOneTweet(response, html)
        })
      } else {
        Utils.responseTweetNotFound(response, tweetID)
      }
    })
  }
  else if (url === '/' && method === 'POST'){
    return Utils.readBody(request)
    .then(Utils.dataToTweet)
    .then((tweet) => Database.addTweets(request, tweet))
    .then(() => Utils.responseRedirectHome(response))
  }
  else if (url.startsWith('/delete/') && method === 'POST'){
    const tweetID = request.url.split('/')[2]
    return Database.apiDeleteTweet(request, tweetID)
    .then(() => Utils.responseRedirectHome(response))
  }
  else if (url.startsWith('/update/') && method === 'POST'){
    const tweetID = request.url.split('/')[2]
    let newText
    return Utils.readBody(request)
    .then((body) => {
      newText = body.split('=')[1]
      newText = decodeURIComponent(newText.replace(/\+/g, ' '))
      return newText
    })
    .then(() => Database.read(tweetsDB))
    .then((data) => {
      const currentData = Utils.updateTweetContent(data, tweetID, newText)
      return Database.write(tweetsDB, currentData) //return
    })
    .then(() => Utils.responseRedirectHome(response))
  }
  else {
    response.statusCode = 400
    response.end('Bad request')
  }
}
