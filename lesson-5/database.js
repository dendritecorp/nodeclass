const fs = require ('fs')
const sqlite3 = require('sqlite3').verbose()

const Utils = require('./utils')
const Commands = require('./tweets.sql.js')

const tweetsDB = 'tweets.json'

const db = new sqlite3.Database('tweets.db', error => {
  if (error) console.error(error)
  console.log('db connected')
})

const Database = {};
module.exports = Database;


Database.tableCheck = () => {
  db.all(Commands.getTweetsTable, (error, rows) => {
    if(error) {
      db.run(Commands.createTweetsTable)
    }
    else if (rows.length) {
      console.log(rows)
    } else {
      console.log('table is empty no tweets, HERE WE NEED TO CREATE TWEETS, using LILITS SCRIPT')
    }
  })
}

Database.write = (path, data) => {

  console.log(Commands.insertTweet(data.user, data.tweet))

  // db.run(Commands.insertTweet(data.user, data.tweet))

  fs.writeFile(path, JSON.stringify(data, null, '\t'), function (err) {
    if (err) throw err;
  })
}

Database.read = () => {
  return new Promise ((resolve, reject) => {
    db.all(Commands.getTweetsTable, (err, rows) => {
      if (err) return reject(err)
      console.log(rows)
      return resolve(rows)
    })
  })
}

Database.apiGetOneTweet = (request) => {
  return Database.read(tweetsDB)
  .then((data) => {
    const id = request.url.split('/')[3]
    if(data){
      let foundTweet = ''
      const currentData = JSON.parse(data.toString())
      currentData.tweets.forEach((tweet) => {
        if (tweet.id == id){
          foundTweet = JSON.stringify(tweet)
        }
      })
      return Promise.resolve(foundTwee)
    }
  })
}

Database.apiUpdateTweet = (request) => {
  let localBody
  const id = request.url.split('/')[3]
  return Utils.readBody(request)
  .then((body) => localBody = body)
  .then(() => Database.read(tweetsDB))
  .then((data) => {
    let found = false
    if(data){
      let currentData = JSON.parse(data.toString())
      currentData.tweets = currentData.tweets.filter(tweet => {  //try with map
        if (tweet.id != id){
          return true
        }
        found = true
        Object.assign(tweet, JSON.parse(localBody)[0])
        return true
      })

      if(found){
        Database.write(tweetsDB, currentData) //return
      }
      return Promise.resolve(found)  //Promise.resolve(found)
    }
  })
}

Database.apiDeleteTweet = (request, id) => {
  return Database.read(tweetsDB)
  .then((data) => {
      let found = false
      if(data){
        let currentData = JSON.parse(data.toString())
        currentData.tweets = currentData.tweets.filter(tweet => {
          if (tweet.id != id){
            return true
          }
          found = true
          return false
        })

        if(found){
          Database.write(tweetsDB, currentData)
        }
        return Promise.resolve(found)
      }
    })
}

Database.apiAddTweets = (request) => {
  let tweetsToBeAdded
  return Utils.readBody(request)
  .then((body) => {
    let bodyJSON = JSON.parse(body)
    bodyJSON.forEach((tweet) => {
      tweet.id = Math.floor(Math.random() * 999999999)
    })
    tweetsToBeAdded = bodyJSON
    return tweetsToBeAdded
  })
  .then((tweetsToBeAdded) => Database.addTweets(request, tweetsToBeAdded))
}

Database.addTweets = (request, tweets) => {
  db.run(Commands.insertTweet(tweets[0].user, tweets[0].tweet), error => {
    console.error(error)
  })
  return 'Added'
  // return Database.read()
  // .then((data) => {
  //   if(!data.toString()){ //file empty
  //     let tweetsObject = {}
  //     tweetsObject.tweets = tweets //object assign Object.assign(tweets., tweetsToBeAdded) two rows
  //     Database.write(tweetsDB, tweetsObject) //return
  //   }
  //   else{ //file has content
  //     let currentData = JSON.parse(data.toString())
  //     currentData.tweets = currentData.tweets.concat(tweets)
  //     Database.write(tweetsDB, currentData) //return
  //   }
  // })
}
