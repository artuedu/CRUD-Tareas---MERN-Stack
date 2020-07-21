const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/mern-tasks';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('DB is connected');
    }
});

// mongoose.connect(URI)
// .then(db => console.log('DB is connected'))
// .catch(err => console.log(err));

module.exports = mongoose;