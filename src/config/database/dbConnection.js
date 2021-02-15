const mongoose = require('mongoose');

const uri = process.env.db_uri;

try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('Connected to DB');
} catch (err) {
    console.log('Database connection error');
}

module.exports = mongoose;