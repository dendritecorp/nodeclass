const fs = require ('fs');
const sqlite3 = require('sqlite3').verbose()
// const SqlString = require('sqlstring');

const Utils = require('./utils')
const Commands = require('./tweets.sql.js')

const tweetsDB = 'tweets.json'
const Database = {};

const db = new sqlite3.Database('tweets.db', error => {
  if (error) console.error(error)
  console.log('db connected')
})

module.exports = Database;

Database.tableCheck = () => {
  db.all(Commands.getTweetsTable, (error, rows) => {
    if(error) {
      db.run(Commands.createTweetsTable)
    }
  })
}

Database.read = () => {
  return new Promise ((resolve, reject) => {
    db.all(Commands.getTweetsTable, (err, rows) => {
      if (err) return reject(err)
      return resolve(rows)
    })
  })
}

Database.addTweets = (tweets) => {
  tweets.forEach((tweet) => {
    db.run(Commands.insertTweet(tweet.user, tweet.tweet), error => {
      if (error) console.error(error)
    })
  })
  return 'Added'
}

Database.updateTweet = (tweetID, newText) => {
  return new Promise ((resolve, reject) => {
    let found = resolve(Database.getTweet(tweetID))
    db.run(Commands.updateTweet(tweetID, newText), error => {
    if (error) console.log(error)
    return resolve(found ? true : false)
    })
  })
}

Database.deleteTweet = (tweetID) => {
  return new Promise ((resolve, reject) => {
    let found = resolve(Database.getTweet(tweetID))
    db.run(Commands.deleteTweet(tweetID), error => {
      if (error) return reject(error);
      return resolve(found ? true : false)
    })
  })
}

Database.getTweet = (tweetID) => {
  return new Promise ((resolve, reject) => {
    db.all(Commands.getTweet(tweetID), (error, row) => {
      if (error) return reject(error)
      return resolve(row[0])
    })
  })
}
