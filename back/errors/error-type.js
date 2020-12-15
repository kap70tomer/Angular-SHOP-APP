let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true},
    EMAIL_ALREADY_EXIST : {id: 2, httpCode: 601, message : "The Specified Email is already in use.", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    NOT_FOUND : {id:4, httpCode: 404, message: "Oops, The requested subject can NOT be found.", isShowStackTrace: false},
}

module.exports = ErrorType;