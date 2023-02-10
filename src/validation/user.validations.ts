import Joi from 'joi';
import { PHONE_REGEX } from '../utils/constants.util';
import { emailSchema, passwordSchema, uuidSchema } from './common.validations';

const firstNameSchema = Joi.string().min(3).max(30).label('first name').disallow('').optional();
const lastNameSchema = Joi.string().min(3).max(30).label('last name').disallow('').optional();
const avatarSchema = Joi.string().label('avatar').disallow('').optional();
const phoneSchema = Joi.string()
	.regex(PHONE_REGEX)
	.label('phone number')
	.messages({ 'string.pattern.base': '{#label} must have 10 digits' })
	.optional();
const genderIdSchema = uuidSchema.label('genderId');

export const signupSchema = Joi.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	avatar: avatarSchema,
	email: emailSchema,
	password: passwordSchema,
	phone: phoneSchema,
	genderId: genderIdSchema,
}).required();

export const loginSchema = Joi.object({
	email: Joi.string().label('email').disallow('').required(),
	password: Joi.string().label('password').disallow('').required(),
}).required();
