import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

class JwtService {

    static sign(payload, expiresIn = '3600s', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiresIn });
    }

    static verify(token, secret = JWT_SECRET) {
        return jwt.verify(token, secret);
    }
}

export default JwtService;