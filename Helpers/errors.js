module.exports = class InvalidPropertyError extends Error{
    constructor(msg){
        super(msg);

        if(Error.captureStackTrace){
            Error.captureStackTrace(InvalidPropertyError);
        }
    }
}

module.exports = class RequiredParameterError extends Error{
    constructor(param){
        super(`${param} cannot be null or undefined`);

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, RequiredParameterError);
        }
    }
}

