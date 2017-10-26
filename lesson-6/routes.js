const Joi = require('joi')

const routes = []
module.exports = routes

const Handlers = require('./handlers')

routes.push({
  method: 'GET',
  path:'/',
  handler: (request, reply) => {
    return reply('hello world')
  }
})

routes.push({
  method: 'POST',
  path:'/api/tweets',
  handler: Handlers.createTweets
})

routes.push({
  method: 'GET',
  path:'/bye/{lastname}',
  config: {
    validate: {
      query: {
        name: Joi.string().required()
      },
      params: {
        lastname: Joi.string()
      }
    }
  },
  handler: (request, reply) => {
    return reply(`bye world ${request.query.name} ${request.params.lastname}`);
  }
})
