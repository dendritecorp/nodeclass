const fs = require ('fs');
const sqlite3 = require('sqlite3').verbose()

const Utils = require('./utils')
const Commands = require('./tweets.sql.js')

const tweetsDB = 'tweets.json'
const Database = {}

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
      rows.map((row) => {
        row.user = decodeURIComponent(row.user)
        row.tweet = decodeURIComponent(row.tweet)
      })
      return resolve(rows)
    })
  })
}

Database.addTweets = (tweets) => {
  return new Promise ((resolve, reject) => {
    tweets.forEach((tweet) => {
      db.run(Commands.insertTweet(encodeURIComponent(tweet.user), encodeURIComponent(tweet.tweet)), error => {
        if (error) reject(error)
      })
    })
    return resolve('')
  })
}

Database.updateTweet = (tweetID, newText) => {
  return new Promise ((resolve, reject) => {
    const found = resolve(Database.getTweet(tweetID))
    db.run(Commands.updateTweet(encodeURIComponent(tweetID), encodeURIComponent(newText)), error => {
    if (error) reject(error)
    return resolve(found ? true : false)
    })
  })
}

Database.deleteTweet = (tweetID) => {
  return new Promise ((resolve, reject) => {
    const found = resolve(Database.getTweet(tweetID))
    db.run(Commands.deleteTweet(encodeURIComponent(tweetID)), error => {
      if (error) return reject(error);
      return resolve(found ? true : false)
    })
  })
}

Database.getTweet = (tweetID) => {
  return new Promise ((resolve, reject) => {
    db.all(Commands.getTweet(encodeURIComponent(tweetID)), (error, row) => {
      if (error) return reject(error)
      if(row[0]){
        row[0].user = decodeURIComponent(row[0].user)
        row[0].tweet = decodeURIComponent(row[0].tweet)
      }
      return resolve(row[0])
    })
  })
}
