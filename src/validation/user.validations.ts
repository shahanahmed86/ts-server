import Joi from 'joi';
import { LoginArgs, UserArgs } from '../@types/api.type';
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

export const profileSchema = Joi.object<UserArgs>({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	avatar: avatarSchema,
	phone: phoneSchema,
	genderId: genderIdSchema,
}).required();

export const signupSchema = profileSchema
	.keys({
		email: emailSchema,
		password: passwordSchema,
	})
	.required();

export const loginSchema = Joi.object<LoginArgs>({
	email: Joi.string().label('email').disallow('').required(),
	password: Joi.string().label('password').disallow('').required(),
}).required();
