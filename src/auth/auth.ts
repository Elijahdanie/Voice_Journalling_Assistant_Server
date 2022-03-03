import jwt from 'jsonwebtoken';
import User from '../models/user'


const secret = 'testKey'

export const auth =  {
    signUser(signProp): string {
        const token = jwt.sign({uE: signProp.id,  }, secret, { expiresIn: '24h' });
        return token;
    },

    isAuthorized(token: string): boolean {
        try {
            const sanitizedToken = sanitizeToken(token);
            return !!jwt.verify(sanitizedToken, secret);
        } catch(err) {
            return false;
        }
    },

    async getUser(token: string): Promise<User> {
        const sanitizedToken = sanitizeToken(token);
        const userId = jwt.verify(sanitizedToken, secret);
        return await User.findByPk((userId as any).uE);
    }
}

const sanitizeToken = (token: string) => {
    const tokenParts = token.split(' ');
    return tokenParts[1];
}