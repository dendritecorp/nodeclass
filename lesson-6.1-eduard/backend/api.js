const fs = require ('fs');
const Boom = require('boom')

const Database = require('./database')

Database.tableCheck()

const Api = {};
module.exports = Api;

Api.apiGetAllTweets = (request, reply) => {
  return Database.read()
  .then((data) => reply(data).type("application/json"))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Api.apiGetOneTweet = (request, reply) => {
  return Database.getTweet(request.params.id)
  .then((tweet) => tweet ? reply(tweet).type("application/json") : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Api.apiUpdateTweet = (request, reply) => {
  return Database.updateTweet(request.params.id, request.payload.tweet)
  .then((found) => found ? reply(`Successfully updated tweet ${request.params.id}`) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Api.apiDeleteTweet = (request, reply) => {
  return Database.deleteTweet(request.params.id)
  .then((found) => found ? reply(`Successfully deleted tweet ${request.params.id}`) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Api.apiPostTweets = (request, reply) => {
  return Database.addTweets(request.payload)
  .then(reply('Tweets added!'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}
