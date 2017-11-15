const Joi = require('joi')

const routes = []
module.exports = routes

const Api = require('./api.js')

routes.push({
  method: 'POST',
  path:'/api/tweets',
  config: {
    tags: ['api'],
    validate: {
      payload: Joi.array().items(Joi.object().keys({
          user: Joi.string().required(),
          tweet: Joi.string().required().max(140)
        }))
    }
  },
  handler: Api.apiPostTweets
})

routes.push({
  method: 'GET',
  path:'/api/tweets',
  config: { tags: ['api'] },
  handler: Api.apiGetAllTweets
})

routes.push({
  method: 'GET',
  path:'/api/tweets/{id}',
  config: { tags: ['api'] },
  handler: Api.apiGetOneTweet
})

routes.push({
  method: 'PUT',
  path:'/api/tweets/{id}',
  config: {
    tags: ['api'],
    validate: {
      payload: Joi.object().keys({
          tweet: Joi.string().required().max(140)
      })
    }
  },
  handler: Api.apiUpdateTweet
})

routes.push({
  method: 'DELETE',
  path:'/api/tweets/{id}',
  config: { tags: ['api'] },
  handler: Api.apiDeleteTweet
})
