const fs = require ('fs');

const Utils = {};
module.exports = Utils;

Utils.webRequestToTweet = (request) => {
  return new Promise ((resolve, reject) => {
    let tweetObject = {}
    tweetObject['user'] = request.payload.user
    tweetObject['tweet'] = request.payload.tweet
    return resolve([tweetObject])
  })
}
