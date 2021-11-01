const route = require('express').Router();
const studentController = require('../Controllers/studentController');

route.get('/getStudents', studentController.GetStudents);
route.post('/putStudent', studentController.PutStudent);

module.exports = route;