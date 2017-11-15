'use strict'
const Hapi = require('hapi')
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('./package');

const routes = require('./routes')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 3000,
})
server.register([Inert,
    Vision,
    {
      'register': HapiSwagger,
      'options': {
        info: {
            'title': 'Test API Documentation',
            'version': Package.version,
          }
      }
    }], (err) => {
    if (err) throw err

    server.route(routes)

    server.start((err) => {
      if (err) throw err
      console.log('Server running at:', server.info.uri);
    });
});
