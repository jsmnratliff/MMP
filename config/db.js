// connect mongoose to DB

const mongoose = require('mongoose');

let connectionString = `mongodb+srv://user6:e5OP04FnAv8dFsNx@cluster0.c1gdirs.mongodb.net/?retryWrites=true&w=majority`

console.log(connectionString);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log when connected
mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});