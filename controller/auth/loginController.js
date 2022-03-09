import Joi from "joi";
import { User } from "../../models";
import { CustomErrorHandler, JwtService, PasswordService } from "../../services";

const logInController = {

    async login(req, res, next) {

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,20}$")).required()
        })

        const { error } = loginSchema.validate();

        if (error) {
            return next(error);
        }

        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email: email });

            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            if (!user.status) {
                return next(CustomErrorHandler.accountSuspended());
            }

            if (!(await PasswordService.comparePassword(user.password, password))) {
                return next(CustomErrorHandler.wrongCredentials('Invalid Password !'));
            }

            const accessToken = JwtService.sign({ _id: user._id, role: user.role, status: user.status });

            res.json({
                statusCode: 200,
                accessToken
            })

        } catch (error) {
            return next(error);
        }
    }
}

export default logInController;