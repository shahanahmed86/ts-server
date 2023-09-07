import jwt, { JwtPayload } from 'jsonwebtoken';
import { DecodePayload, EncodePayload } from '../@types/library.type';
import configs from '../config';
import { JWT_ACCESS_EXPIRY_IN_SECONDS } from '../utils/constants.util';

const { secret } = configs.jwt.access;

export const encodePayload: EncodePayload = (
	key,
	payload,
	expiresIn = JWT_ACCESS_EXPIRY_IN_SECONDS,
) => {
	return jwt.sign({ [key]: payload }, secret, { expiresIn });
};

export const decodePayload: DecodePayload = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) reject(err);
			else if (!decoded) reject(new Error('Token payload is empty'));
			else resolve(decoded as JwtPayload);
		});
	});
};
