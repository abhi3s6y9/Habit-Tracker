const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/habit_DB', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database Connected !!!");
});

module.exports= db;