class CustomErrorHandler extends Error {

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    static alreadyExists(message) {
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message = 'Username or Password is wrong!') {
        return new CustomErrorHandler(401, message);
    }

    static accountSuspended(message = 'Your account is suspended! Please contact administrator.') {
        return new CustomErrorHandler(401, message);
    }
}

export default CustomErrorHandler;