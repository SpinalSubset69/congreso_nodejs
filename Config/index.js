const env = require('dotenv');
env.config();

const config = {
    port: process.env.PORT || 3000,
    mongodburi: process.env.MONGODB_URI,

} 

module.exports = config;