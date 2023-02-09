import Joi from 'joi';
import { PASSWORD_REGEX } from '../utils/constants.util';
import { usernameSchema, passwordSchema } from './common.validations';

const avatarSchema = Joi.string().label('avatar').disallow('');
const fullNameSchema = Joi.string().min(3).max(30).label('full name').disallow('');
const emailSchema = Joi.string().email().label('email').disallow('');
const cellSchema = Joi.string()
	.regex(new RegExp(PASSWORD_REGEX))
	.label('cell number')
	.messages({ 'string.pattern.base': '{#label} must have 10 digits' });
const genderSchema = Joi.string().label('gender').disallow('');

export const userSignUpSchema = Joi.object({
	username: usernameSchema,
	password: passwordSchema,
	avatar: avatarSchema,
	fullName: fullNameSchema,
	email: emailSchema,
	cell: cellSchema,
	gender: genderSchema,
}).required();

export const userLoginSchema = Joi.object({
	username: usernameSchema,
	password: usernameSchema.label('password'),
}).required();
