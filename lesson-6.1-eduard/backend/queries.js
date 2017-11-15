const TWEETS_TABLE = 'tweets'
const TWEETS_TABLE_COLUMNS_CREATE = '(user VARCHAR(100), tweet VARCHAR(140), created_at TIMESTAMP, updated_at TIMESTAMP, deleted_at TIMESTAMP)'

const TWEETS_INSERT_TABLE_COLUMNS = '(user, tweet, created_at)'

let Queries = {}
module.exports = Queries

Queries.createTweetsTable = `CREATE TABLE ${TWEETS_TABLE} ${TWEETS_TABLE_COLUMNS_CREATE}`

Queries.getTweetsTable = `SELECT rowid as id, ${TWEETS_TABLE}.* FROM ${TWEETS_TABLE} WHERE deleted_at IS NULL`

Queries.insertTweet = (user, tweet, created_at) => `INSERT INTO ${TWEETS_TABLE} ${TWEETS_INSERT_TABLE_COLUMNS} VALUES ("${user}", "${tweet}", "${created_at}")`

Queries.updateTweet = (tweetID, newText, updated_at) => `UPDATE ${TWEETS_TABLE} SET tweet = "${newText}", updated_at = "${updated_at}" WHERE rowid = "${tweetID}" AND deleted_at IS NULL`

Queries.deleteTweet = (tweetID, deleted_at) => `UPDATE ${TWEETS_TABLE} SET deleted_at = "${deleted_at}" WHERE rowid = "${tweetID}" AND deleted_at IS NULL`

Queries.getTweet = (tweetID) => `SELECT rowid as id, ${TWEETS_TABLE}.* FROM ${TWEETS_TABLE} WHERE rowid = "${tweetID}" AND deleted_at IS NULL`
