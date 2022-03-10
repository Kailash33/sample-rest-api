import { User } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const authenticate = async (req, res, next) => {

    if (!req.headers.authorization) {
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const { _id, role, status } = await JwtService.verify(token);

        const user = await User.findOne({ _id: _id }).select('-password -updatedAt -__v');

        if (!user) {
            return next(CustomErrorHandler.notFound());
        }

        if (!user.status) {
            return next(CustomErrorHandler.accountSuspended());
        }

        req.user = user;

        next();
    } catch (error) {
        return next(error)
    }
}

export default authenticate;