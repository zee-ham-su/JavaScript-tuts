const { MongoClient } = require('mongodb');
let dbConnection;
let uri = 'mongodb+srv://hamzasufian2014:1MZQ7KE5Z7djgmGb@cluster0.ovpb1oc.mongodb.net/?retryWrites=true&w=majority'
// database init connection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch((err) => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
    }