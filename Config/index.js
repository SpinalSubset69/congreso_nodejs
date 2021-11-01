const env = require('dotenv');
env.config();

const config = {
    port: process.env.PORT || 3000,
    mongodburi: process.env.MONGODB_URI,
    emailSender: process.env.EMAIL_SENDER_ID,
    emailSenderPassword: process.env.EMAIL_SENDER_PASSWORD,
    emailDestination: process.env.EMAIL_DESTINATION_ID
} 

module.exports = config;