const fs = require ('fs');
const sqlite3 = require('sqlite3').verbose()

const Queries = require('./queries.js')

const Database = {}

const db = new sqlite3.Database('tweets.db', error => {
  if (error) console.error(error)
  console.log('db connected')
})

module.exports = Database;

Database.tableCheck = () => {
  db.all(Queries.getTweetsTable, (error, rows) => {
    if(error) {
      db.run(Queries.createTweetsTable)
    }
  })
}

Database.read = () => {
  return new Promise ((resolve, reject) => {
    db.all(Queries.getTweetsTable, (err, rows) => {
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
      const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC'
      db.run(Queries.insertTweet(encodeURIComponent(tweet.user), encodeURIComponent(tweet.tweet), created_at), error => {
        if (error) reject(error)
      })
    })
    return resolve('')
  })
}

Database.updateTweet = (tweetID, newText) => {
  return new Promise ((resolve, reject) => {
    const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC'
    db.run(Queries.updateTweet(encodeURIComponent(tweetID), encodeURIComponent(newText), updated_at), function(error){
      if (error) reject(error)
      return resolve(this.changes ? true : false)
    })
  })
}

Database.deleteTweet = (tweetID) => {
  return new Promise ((resolve, reject) => {
    const deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC'
    db.run(Queries.deleteTweet(encodeURIComponent(tweetID), deleted_at), function(error){
      if (error) return reject(error);
      return resolve(this.changes ? true : false)
    })
  })
}

Database.getTweet = (tweetID) => {
  return new Promise ((resolve, reject) => {
    db.all(Queries.getTweet(encodeURIComponent(tweetID)), (error, row) => {
      if (error) return reject(error)
      if(row[0]){
        row[0].user = decodeURIComponent(row[0].user)
        row[0].tweet = decodeURIComponent(row[0].tweet)
      }
      return resolve(row[0])
    })
  })
}
