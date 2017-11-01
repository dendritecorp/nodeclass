const fs = require ('fs');
const Handlebars = require('handlebars');
const Boom = require('boom')

const Database = require('./database')
const Template = require('./template.js')

const AllTweetsTemplate =  './public/index.hbs'
const OneTweetTemplate =  './public/tweet.hbs'

Database.tableCheck()

const Handlers = {};
module.exports = Handlers;

Handlers.webIndexPage = (request, reply) => {
  return Database.read()
  .then((data) => Template.allTweets(data))
  .then(reply)
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webCreateTweet = (request, reply) => {
  return Database.addTweets([request.payload])
  .then(reply.redirect('/'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webDeleteTweet = (request, reply) => {
  return Database.deleteTweet(request.params.id)
  .then(reply.redirect('/'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webUpdateTweet = (request, reply) => {
  return Database.updateTweet(request.params.id, request.payload.text)
  .then(reply.redirect('/'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webViewTweet = (request, reply) => {
  return Database.getTweet(request.params.id)
  .then(Template.oneTweet)
  .then ((html) => html ? reply(html) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.apiGetAllTweets = (request, reply) => {
  return Database.read()
  .then((data) => reply(data).type("application/json"))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.apiGetOneTweet = (request, reply) => {
  return Database.getTweet(request.params.id)
  .then((tweet) => tweet ? reply(tweet).type("application/json") : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.apiUpdateTweet = (request, reply) => {
  return Database.updateTweet(request.params.id, request.payload.tweet)
  .then((found) => found ? reply(`Successfully updated tweet ${request.params.id}`) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.apiDeleteTweet = (request, reply) => {
  return Database.deleteTweet(request.params.id)
  .then((found) => found ? reply(`Successfully deleted tweet ${request.params.id}`) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.apiPostTweets = (request, reply) => {
  return Database.addTweets(request.payload)
  .then(reply('Tweets added!'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}
