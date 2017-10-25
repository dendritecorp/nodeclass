const TWEETS_TABLE = 'tweets'
const TWEETS_TABLE_COLUMNS_CREATE = '(user VARCHAR(100), tweet VARCHAR(140))'

const TWEETS_TABLE_COLUMNS = '(user, tweet)'

let Commands = {}
module.exports = Commands

Commands.createTweetsTable = `CREATE TABLE ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS_CREATE}`

Commands.getTweetsTable = `SELECT * FROM ${TWEETS_TABLE}`

Commands.insertTweet = (user, tweet) => `INSERT INTO ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS} VALUES ('${user}', '${tweet}')`
