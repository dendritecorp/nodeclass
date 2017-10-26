const Handlers = {}
module.exports = Handlers

Handlers.createTweets = (req, reply) => {
  return reply(req.payload)
}
