const fs = require ('fs');
const Handlebars = require('handlebars');

const Database = require('./database')
const Utils = require('./utils')
const Template = require('./template.js')

const AllTweetsTemplate =  './public/index.hbs'
const OneTweetTemplate =  './public/tweet.hbs'
const tweetsDB = 'tweets.json'


Database.tableCheck()

const Handlers = {};
module.exports = Handlers;

Handlers.webIndexPage = (request, reply) => {
  return Database.read()
  .then((data) => Template.allTweets(data))
  .then(reply)
}

Handlers.webCreateTweet = (request, reply) => {
  return Utils.webRequestToTweet(request)
  .then(Database.addTweets)
  .then(reply.redirect('/'))
}

Handlers.webDeleteTweet = (request, reply) => {
  return Database.deleteTweet(request.params.id)
  .then(reply.redirect('/'))
}

Handlers.webUpdateTweet = (request, reply) => {
  return Database.updateTweet(request.params.id, request.payload.text)
  .then(reply.redirect('/'))
}

Handlers.webViewTweet = (request, reply) => {
  return Database.getTweet(request.params.id)
  .then(Template.oneTweet)
  .then ((html) => html ? reply(html) : reply(`Tweet with id ${request.params.id} not found`))
}

Handlers.apiGetAllTweets = (request, reply) => {
  return Database.read()
  .then((data) => reply(data).type("application/json"))
}

Handlers.apiGetOneTweet = (request, reply) => {
  return Database.getTweet(request.params.id)
  .then((tweet) => tweet ? reply(tweet).type("application/json") : reply(`Tweet with id ${request.params.id} not found`))
}

Handlers.apiUpdateTweet = (request, reply) => {
  return Database.updateTweet(request.params.id, JSON.parse(request.payload).tweet)
  .then((found) => found ? reply(`Successfully updated tweet ${request.params.id}`) : reply(`Tweet with id ${request.params.id} not found`))
}

Handlers.apiDeleteTweet = (request, reply) => {
  return Database.deleteTweet(request.params.id)
  .then((found) => found ? reply(`Successfully deleted tweet ${request.params.id}`) : reply(`Tweet with id ${request.params.id} not found`))
}

Handlers.apiPostTweets = (request, reply) => {
  return Database.addTweets(JSON.parse(request.payload))
  .then(reply('Received data'))
}
