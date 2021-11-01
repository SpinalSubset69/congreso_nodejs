const RequiredParameterError = require('../Helpers/errors');

module.exports = function makeHttp(res, e){
    const status = e instanceof RequiredParameterError ? 400 : 500;

    return res.status(status).json({
        errorMessage: e.message,
        statusCode: status
    });
}