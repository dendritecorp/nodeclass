const fs = require ('fs');
const Handlebars = require('handlebars');
const Boom = require('boom')
const Request = require('request-promise')

const TWEETS_API = 'http://localhost:3000/api/tweets'

const Handlers = {};
module.exports = Handlers;

Handlers.webIndexPage = (request, reply) => {
  const options = {
    uri: TWEETS_API,
    json: true
  }
  Request(options)
  .then((data) => {
    data.map((tweet) => {
      tweet.tweet = decodeURIComponent(tweet.tweet)
      tweet.user = decodeURIComponent(tweet.user)
    });
    reply.view('index', {tweets: data})
  })
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webCreateTweet = (request, reply) => {
  const options = {
    uri: TWEETS_API,
    body: [request.payload],
    json: true,
    method: 'POST'
  }
  Request(options)
  .then(reply.redirect('/'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webDeleteTweet = (request, reply) => {
  const tweetURI = TWEETS_API + '/' + request.params.id
  const options = {
    uri: tweetURI,
    method: 'DELETE'
  }
  Request(options)
  .then(reply.redirect('/'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webUpdateTweet = (request, reply) => {
  const tweetURI = TWEETS_API + '/' + request.params.id
  const options = {
    uri: tweetURI,
    method: 'PUT',
    body: {
      tweet: request.payload.text
    },
    json: true
  }
  Request(options)
  .then(reply.redirect('/'))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}

Handlers.webViewTweet = (request, reply) => {
  const tweetURI = TWEETS_API + '/' + request.params.id
  const options = {
    uri: tweetURI,
    method: 'GET',
    json: true
  }
  Request(options)
  .then((foundTweet) => {
    if(!foundTweet) return false
    foundTweet.tweet = decodeURIComponent(foundTweet.tweet)
    foundTweet.user = decodeURIComponent(foundTweet.user)
    return {tweets: foundTweet}
  })
  .then ((tweet) => tweet ? reply.view('tweet', tweet) : reply(Boom.notFound(`Tweet with id ${request.params.id} not found`)))
  .catch((error) => {
    return reply(Boom.badRequest(error.message))
  })
}
