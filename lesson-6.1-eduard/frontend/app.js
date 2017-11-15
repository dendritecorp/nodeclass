'use strict'
const Hapi = require('hapi')
const routes = require('./routes')
const Vision = require('vision')
const Handlebars = require('handlebars')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 4000,
})

server.register(Vision, (err) => {
    if (err) throw err

    server.views({
        engines: { hbs: Handlebars },
        path: __dirname + '/public'
    });

    server.route(routes)

    server.start((err) => {
      if (err) throw err
      console.log('Server running at:', server.info.uri);
    });
  });
