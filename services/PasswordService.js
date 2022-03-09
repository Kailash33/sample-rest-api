import bcrypt from 'bcrypt';

const passwordService = {
    // GENERATE HASH PASSWORD
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    },
    // COMPARE PASSWORD
    async comparePassword(hashedPassword, userPassword) {
        return await bcrypt.compare(userPassword, hashedPassword);
    }
}

export default passwordService;