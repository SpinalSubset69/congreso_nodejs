const mongoose = require('mongoose');
const config = require('../Config/index');

mongoose.connect(config.mongodburi, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Database Connected!!');
})
.catch((e) => {
    console.log('Error: ' + e)
});