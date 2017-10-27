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
  handler: Handlers.apiGetOneTweet
})

routes.push({
  method: 'PUT',
  path:'/api/tweets/{id}',
  handler: Handlers.apiUpdateTweet
})

routes.push({
  method: 'DELETE',
  path:'/api/tweets/{id}',
  handler: Handlers.apiDeleteTweet
})
