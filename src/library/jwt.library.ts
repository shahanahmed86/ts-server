import jwt, { JwtPayload } from 'jsonwebtoken';
import { DecodePayload, EncodePayload } from '../@types/library.type';
import configs from '../config';
import { JWT_EXPIRY_IN_SECONDS } from '../utils/constants.util';

const { JWT_SECRET } = configs.BASE_CONFIG;

export const encodePayload: EncodePayload = (key, payload, expiresIn = JWT_EXPIRY_IN_SECONDS) => {
	return jwt.sign({ [key]: payload }, JWT_SECRET, { expiresIn });
};

export const decodePayload: DecodePayload = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) reject(err);
			else if (!decoded) reject(new Error('Token payload is empty'));
			else resolve(decoded as JwtPayload);
		});
	});
};
