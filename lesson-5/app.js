'use strict'

const http = require('http');
const Handlers = require('./handlers')
const Utils = require('./utils')

const PORT = 8080

http.createServer((request, response) => {
  return Handlers.handleEndpoints(request, response)
  .catch((err) => {
    console.log({err})
    Utils.badRequestResponse(response, err)
  })
}).listen(PORT || 3000);
