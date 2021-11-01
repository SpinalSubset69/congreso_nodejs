const InvalidPropertyError = require('../Helpers/errors');
const RequiredParameter = require('../Helpers/requiredParams');

module.exports = function makeStudent(studentInfo = RequiredParameter('UserInfo')){
    const validStudent = Validate(studentInfo);
    return validStudent;
}

function Validate({
    name = RequiredParameter('name'),
    studentNumber = RequiredParameter('StudentNumber'),
    day = RequiredParameter('Day'),
    hour= RequiredParameter('Hour'),
    registerAt= RequiredParameter('RegisterAt'),
    career= RequiredParameter('Career'),
    activity= RequiredParameter('Activity'),
    email= RequiredParameter('Email'),
    phone
}){
    ValidateName(name);
    ValidateStudentNumber(studentNumber);
    ValidateDay(day);
    ValidateHour(hour);
    ValidateRegisterAt(registerAt);
    ValidateCareer(career);
    ValidateActivity(activity);
    ValidateEmail(email);

    return {
        name, studentNumber, day, hour, registerAt, career, activity, phone, email
    }
}

function ValidateName(name){
    if(name.length <= 0){
        throw new InvalidPropertyError('Insert a Valid Name');
    }
}
function ValidateStudentNumber(studentNumber){
    const valid = new RegExp(/([a])\d+/);
    if(!valid.test(studentNumber)){
        throw new InvalidPropertyError('Insert a valid StudentNumber(a Followed by only numbers)');
    }
}

function ValidateDay(day){
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if(!days.includes(day.toLowerCase())){
        throw new InvalidPropertyError('Insert a valid day')
    }
}

function ValidateHour(hour){
    if(hour < 0){
        throw new InvalidPropertyError('Insert a valid Hour');
    }
}

function ValidateRegisterAt(registerAt){
    if(!registerAt){
        throw new InvalidPropertyError('Insert a date to register student');
    }
}

function ValidateCareer(career){
    if(!ValidateCarrerAndActivity(career)){
        throw new InvalidPropertyError('Insert a valide Career');
    }
}

function ValidateActivity(activity){
    if(!ValidateCarrerAndActivity(activity)){
        throw new InvalidPropertyError('Insert a valid Activity');
    }
}

function ValidateEmail(email){
    const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    if(!valid.test(email)){
        throw new InvalidPropertyError('Insert a valid email direction(example@example.com)');
    }
}


function ValidateCarrerAndActivity(param){
    const careers = ['sistemas', 'nutricion', 'nutrición', 'enfermeria','enfermería','contador', 'bioquimico', 'bioquímico', 'agronomo', 'agrónomo' ];
    const career_split = param.split(' ');

    for(let i = 0; i< careers.length; i++ ){
        for(let j  = 0; j < career_split.length; j++){
            if(careers[i].toLowerCase() === career_split[j].toLowerCase()){
                return true;
            }
        }
    }
    return false;
}