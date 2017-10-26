const fs = require ('fs');
const Commands = require ('./tweets.sql.js');
var sqlite3 = require('sqlite3').verbose();

const Database = {};
module.exports= Database;

let db = new sqlite3.Database('tweet.db', error => {
    if (error) {
        console.error(error);
    }
    console.log('db connected');
});

Database.tableCheck = () => {
    db.all(Commands.getTweetsTable, (error,rows)=> {
        if(error) {
            db.run(Commands.createTweetsTable);
        }

        else if(rows.length){
            console.log(rows);//table exists
        }
        else  {
            console.log('table is empty');
        }
    })

};

Database.read = () => {
    return new Promise ((resolve, reject) => {
        db.all(Commands.getTweetsTable, (err, rows) => {
            if (err) return reject(err)
            return resolve(rows)
        })
    })
};

Database.addTweets = (body) => {
    let parsedBody = JSON.parse(body);
    parsedBody.forEach((item) => {
        item.id = Math.floor(Math.random() * 10000).toString();
    });
    parsedBody.forEach((tweet) => {
        db.run(Commands.insertTweets(tweet.user, tweet.tweet, tweet.id), error => {
            if (error) console.error(error)
        })
    });
    return 'Added'
};

Database.getTweetById = (id, tweets) => {
    return tweets.find(tweet => tweet.id === id)
};

Database.deleteTweet = (urlId) => {
    db.run(Commands.deleteTweetTable(urlId), error => {
        console.log('delete',error)
    });
    return Promise.resolve();
};

Database.updateTweets = (urlId,body) => {
    let parsedBody = JSON.parse(body);
    db.run(Commands.UpdateTweetTable(parsedBody.user,parsedBody.tweet,urlId), error => {
        console.log('update',error)
    })
};

Database.getTweet = (tweetID) => {
    console.log('id',tweetID);
    return new Promise ((resolve, reject) => {
        db.all(Commands.getOneTweet(tweetID), (error, row) => {
            if (error) return reject(error);
            return resolve(row)
        })
    })
}

