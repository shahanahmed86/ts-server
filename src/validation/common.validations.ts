import Joi from 'joi';
import { ChangePasswordArgs, ImageParams } from '../@types/api.type';
import configs from '../config';
import { PASSWORD_REGEX } from '../utils/constants.util';

const { BCRYPT_MAX_BYTES } = configs.BASE_CONFIG;

export const uuidSchema = Joi.string().uuid().disallow('');

export const emailSchema = Joi.string().email().label('email').disallow('');

export const passwordSchema = Joi.string()
	.trim()
	.max(BCRYPT_MAX_BYTES, 'utf8')
	.regex(PASSWORD_REGEX)
	.label('password')
	.messages({
		'string.pattern.base': '{#label} must contain at least one uppercase/lowercase/digit',
	});

export const changePasswordSchema = Joi.object<ChangePasswordArgs>({
	oldPassword: passwordSchema.required().label('old password'),
	password: passwordSchema
		.disallow(Joi.ref('oldPassword'))
		.label('new password')
		.messages({
			'any.invalid': '{#label} cannot be same as old one',
		})
		.required(),
}).required();

export const fileRef = Joi.object<ImageParams>({
	filename: Joi.string().required().label('filename'),
}).required();
