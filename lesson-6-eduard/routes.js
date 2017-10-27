const Joi = require('joi')

const routes = []
module.exports = routes

const Handlers = require('./handlers')

routes.push({
  method: 'GET',
  path:'/',
  handler: Handlers.webIndexPage
})

routes.push({
  method: 'POST',
  path:'/',
  handler: Handlers.webCreateTweet
})

routes.push({
  method: 'GET',
  path:'/view/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string()
      }
    }
  },
  handler: Handlers.webViewTweet
})

routes.push({
  method: 'POST',
  path:'/delete/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string()
      }
    }
  },
  handler: Handlers.webDeleteTweet
})

routes.push({
  method: 'POST',
  path:'/update/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string()
      },
      query: {
        tweet: Joi.string()
      }
    }
  },
  handler: Handlers.webUpdateTweet
})

routes.push({
  method: 'POST',
  path:'/api/tweets',
  handler: Handlers.apiPostTweets
})

routes.push({
  method: 'GET',
  path:'/api/tweets',
  handler: Handlers.apiGetAllTweets
})

routes.push({
  method: 'GET',
  path:'/api/tweets/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string()
      }
    }
  },
  handler: Handlers.apiGetOneTweet
})

routes.push({
  method: 'PUT',
  path:'/api/tweets/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string()
      }
    }
  },
  handler: Handlers.apiUpdateTweet
})

routes.push({
  method: 'DELETE',
  path:'/api/tweets/{id}',
  config: {
    validate: {
      params: {
        id: Joi.string()
      }
    }
  },
  handler: Handlers.apiDeleteTweet
})
