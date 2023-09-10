import jwt, { JwtPayload } from 'jsonwebtoken';
import configs from '../config';
import { JWT_EXPIRY_IN_SEC } from '../utils/constants.util';

const { secret } = configs.jwt;

export const encodePayload = (payload: object, expiresIn = JWT_EXPIRY_IN_SEC) => {
	return jwt.sign(payload, secret, { expiresIn });
};

export const decodePayload = (token: string): Promise<JwtPayload> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) reject(err);
			if (!decoded) reject(new Error('Token payload is empty'));

			resolve(decoded as JwtPayload);
		});
	});
};
