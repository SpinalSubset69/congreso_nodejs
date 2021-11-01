const InvalidPropertyError = require('../Helpers/errors');
const RequiredParameter = require('../Helpers/requiredParams');

module.exports = function makeEmail(emailInfo = RequiredParameter('EmailInfo')){
    const validEmail = Validate(emailInfo);
    return validEmail;
}

function Validate({
    name = RequiredParameter('Name'),
    phone = RequiredParameter('Phone'),
    email = RequiredParameter('Email'),
    subject = RequiredParameter('Subject'),
    body = RequiredParameter('body')
}){
    ValidateName(name);
    ValidatePhone(phone);
    ValidateEmail(email);
    ValidateSubject(subject);
    ValidateMessage(body);

    return {
        name, phone, email, subject, body
    }
}

function  ValidateName(name){
    if(name.length < 4){
        throw new InvalidPropertyError('Insert a valid name');
    }
}

function ValidatePhone(phone){
    if(phone.length < 10){
        throw new InvalidPropertyError('Insert a valid phone number, must be at least 10 digits and ');
    }
}

function ValidateEmail(email){
    const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    if(!valid.test(email)){
        throw new InvalidPropertyError('Insert a valid email direction(example@example.com)');
    }
}

function ValidateSubject(subject){
    if(subject.length < 5){
        throw new InvalidPropertyError('Insert a valid subject, must be at least 5 character and ');
    }
}

function ValidateMessage(body){
    if(body.length < 10){
        throw new InvalidPropertyError('Insert a valid message, must be at least 10 characters and');
    }
}