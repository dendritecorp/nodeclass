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
  config: {
    validate: {
      payload: {
        user: Joi.string().required(),
        tweet: Joi.string().required().max(140)
      }
    }
  },
  handler: Handlers.webCreateTweet
})

routes.push({
  method: 'GET',
  path:'/view/{id}',
  handler: Handlers.webViewTweet
})

routes.push({
  method: 'POST',
  path:'/delete/{id}',
  handler: Handlers.webDeleteTweet
})

routes.push({
  method: 'POST',
  path:'/update/{id}',
  config: {
    validate: {
      payload: {
        text: Joi.string().required().max(140)
      }
    }
  },
  handler: Handlers.webUpdateTweet
})

routes.push({
  method: 'POST',
  path:'/api/tweets',
  config: {
    validate: {
      payload: Joi.array().items(Joi.object().keys({
          user: Joi.string().required(),
          tweet: Joi.string().required().max(140)
        }))
    }
  },
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
  handler: Handlers.apiGetOneTweet
})

routes.push({
  method: 'PUT',
  path:'/api/tweets/{id}',
  config: {
    validate: {
      payload: Joi.object().keys({
          tweet: Joi.string().required().max(140)
      })
    }
  },
  handler: Handlers.apiUpdateTweet
})

routes.push({
  method: 'DELETE',
  path:'/api/tweets/{id}',
  handler: Handlers.apiDeleteTweet
})
