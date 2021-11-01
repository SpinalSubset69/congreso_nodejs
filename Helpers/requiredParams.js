const RequiredParameterError = require('./errors')
module.exports = function requiredParams(param){
    throw new RequiredParameterError(param);
}