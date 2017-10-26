const fs = require ('fs');
const Handlebars = require('handlebars');
const Database = require('./database')
const AllTweetsTemplate =  './public/index.hbs'
const OneTweetTemplate =  './public/tweet.hbs'
const tweetsDB = 'tweets.json'
const Utils = require('./utils')
const Template = require('./template.js')

Database.tableCheck()

const Handlers = {};
module.exports = Handlers;

Handlers.handleEndpoints = (request, response) => {
  const { headers, method, url } = request
  const apiID = request.url.split('/')[3]
  const webID = request.url.split('/')[2]

  if (url === '/favicon.ico'){
    response.end()
    return Promise.resolve()
  }
  else if(url === '/api/tweets' && method === 'POST'){
    return Utils.readBody(request)
    .then((body) => {
      let tweets = JSON.parse(body)
      return tweets
    })
    .then(Database.addTweets)
    .then(Utils.responseAddTweets(response))
  }
  else if (url === '/api/tweets' && method === 'GET'){
    return Database.read()
    .then((data) => Utils.responseGetAllTweets(response, JSON.stringify(data)))
  }
  else if (url.startsWith('/api/tweets/')){
    switch(method){
      case 'GET':
        return Database.getTweet(apiID)
        .then((tweet) => {
          tweet ? Utils.responseGetOneTweet(response, JSON.stringify(tweet)) : Utils.responseTweetNotFound(response, apiID)
        })
        break;
      case 'DELETE':
        return Database.deleteTweet(apiID)
        .then((found) => {
          found ? Utils.responseDelete(response, apiID) : Utils.responseTweetNotFound(response, apiID)
        })
        break;
      case 'PUT':
      return Utils.readBody(request)
      .then((body) => {
        let tweet = JSON.parse(body)
        console.log(tweet[0].tweet);
        return tweet[0].tweet
      })
      .then((newText) => Database.updateTweet(apiID, newText))
      .then((found) => {
          found ? Utils.responseUpdate(response, apiID) : Utils.responseTweetNotFound(response, apiID)
      })
        break;
    }
  }
  else if (url === '/' && method === 'GET'){
    return Database.read()
    .then((data) => Template.allTweets(response, data))
    .then((html) => Utils.responseWebParseHTML(response, html))
  }
  else if(url.startsWith('/view/') && method === 'GET'){
    let foundTweet = ''
    return Database.getTweet(webID)
    .then((tweet) => {
      if (tweet) foundTweet = tweet
      return foundTweet
    })
    .then(() => Template.oneTweet(foundTweet))
    .then ((html) => {
      foundTweet ? Utils.responseWebParseHTML(response, html) : Utils.responseTweetNotFound(response, webID)
    })
  }
  else if (url === '/' && method === 'POST'){
    return Utils.readBody(request)
    .then(Utils.dataToTweet)
    .then((tweet) => Database.addTweets(tweet))
    .then(() => Utils.responseRedirectHome(response))
  }
  else if (url.startsWith('/delete/') && method === 'POST'){
    return Database.deleteTweet(webID)
    .then(() => Utils.responseRedirectHome(response))
  }
  else if (url.startsWith('/update/') && method === 'POST'){
    let newText
    return Utils.readBody(request)
    .then((body) => {
      newText = body.split('=')[1]
      newText = decodeURIComponent(newText.replace(/\+/g, ' '))
      return newText
    })
    .then(() => Database.updateTweet(webID, newText))
    .then(() => Utils.responseRedirectHome(response))
  }
  else {
    response.statusCode = 400
    response.end('Bad request')
  }
}
