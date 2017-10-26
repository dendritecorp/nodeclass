const Utils = require('./utils');
const Template = require('./template');
const Database = require('./database')

Database.tableCheck();

const Handlers = {};
module.exports = Handlers;

Handlers.checkEndpoints = (request,response) => {
        let urlId = request.url.split('/')[3];
        const { method, url} = request;
        if (url.startsWith('/api/tweets')) {
            if (method === 'POST') {
                return Utils.readBody(request)
                .then((body) => Database.addTweets(body))
                .then(() => Utils.responsePost(response))
            }
            else if (method === 'GET') {
                if (urlId) {
                    return Database.read()
                    .then((data) => Database.getTweetById(urlId,data))
                    .then((obj) => Utils.responseGet(response, obj))
                }
                else {
                    return Database.read()
                    .then((obj) => Utils.responseGet(response, obj))
                }
            }
            else if (method === 'PUT') {
                return Utils.readBody(request)
                .then((body) => Database.updateTweets(urlId, body))
                .then((message) => Utils.responsePut(response, message))
            }
            else if (method === 'DELETE') {
                return Database.deleteTweet(urlId)
                .then((message) => Utils.responseDelete(response, urlId, message))
            }
        }
        else if(url.startsWith('/delete/')) {
           return Utils.splitId(request)
           .then((id) => Database.deleteTweet(id))
           .then(() => Utils.redirectHomeResponse(response))
        }
        else if (url.startsWith('/update/')) {
            const url = request.url.split('/')[2];
            const id = url.split('?')[0];
            return Utils.readBody(request)
            .then((body) => Utils.splitForUpdate(body))
            .then((obj) => Database.updateTweets(id,obj))
            .then(() => Utils.redirectHomeResponse(response))
        }
        else if (url === '/' && method === 'GET'){
            return Database.read()
            .then((data) => Template.compilingAllTweets(data))
            .then((html) => Utils.responseWebParseHTML(response, html))
        }
        else if(method === 'GET'){
            let foundTweet = '';
            return Database.getTweet(request.url.split('/')[1])
                .then((tweet) => {
                    if (tweet) foundTweet = tweet;
                    return foundTweet
                })
                .then(() => Template.compilingOneTweet(foundTweet))
                .then ((html) => {
                    if (foundTweet) {
                        Utils.responseWebParseHTML(response, html)
                    }
                })
        }
        else if (url.split('?')[0] === '/create') {
            return Utils.readBody(request)
            .then((body) => Utils.splitValues(body))
            .then((obj) => Database.addTweets(obj))
            .then(() => Utils.redirectHomeResponse(response))
        }
        return Utils.badRequestResponse(response);
};
