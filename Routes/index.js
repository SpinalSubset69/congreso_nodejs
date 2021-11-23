const route = require('express').Router();
const studentController = require('../Controllers/studentController');
const emailController = require('../Controllers/emailController');

route.get('/getStudents', studentController.GetStudents);
route.post('/postStudent', studentController.PutStudent);
route.post('/sendemail', emailController.sendEmail);

module.exports = route;