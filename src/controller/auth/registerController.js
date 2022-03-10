import Joi from "joi";
import { User } from "../../models";
import { CustomErrorHandler, JwtService, PasswordService } from "../../services";

const registerController = {

    async register(req, res, next) {

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,20}$")).required(),
            confirmPassword: Joi.ref("password")
        });

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { name, email, password } = req.body;

        try {
            const isExists = await User.exists({ email: email });

            if (isExists) {
                return next(CustomErrorHandler.alreadyExists('This email is already registered.'));
            }
        } catch (error) {
            return next(error)
        }

        const hashPassword = await PasswordService.hashPassword(password)

        let accessToken = '';

        const user = new User({ name, email, password: hashPassword });

        try {

            const result = await user.save();

            accessToken = JwtService.sign({ _id: result._id, role: result.role, status: result.status });
        }
        catch (error) {
            return next(error)
        }

        res.json({
            message: "Registered Successfully.",
            accessToken
        });
    }
};

export default registerController;
