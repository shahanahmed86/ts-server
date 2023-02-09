import Joi from 'joi';
import { PHONE_REGEX } from '../utils/constants.util';
import { emailSchema, passwordSchema } from './common.validations';

const avatarSchema = Joi.string().label('avatar').disallow('');
const firstNameSchema = Joi.string().min(3).max(30).label('first name').disallow('');
const lastNameSchema = Joi.string().min(3).max(30).label('last name').disallow('');
const phoneSchema = Joi.string()
	.regex(new RegExp(PHONE_REGEX))
	.label('phone number')
	.messages({ 'string.pattern.base': '{#label} must have 10 digits' });
const genderSchema = Joi.string().label('gender').disallow('');

export const signupSchema = Joi.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	avatar: avatarSchema,
	email: emailSchema,
	password: passwordSchema,
	phone: phoneSchema,
	gender: genderSchema,
}).required();

export const loginSchema = Joi.object({
	email: Joi.string().label('email').required(),
	password: Joi.string().label('password').required(),
}).required();
