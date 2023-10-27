import * as z from 'zod';
import { Password, Phone } from './common.validation';

export const Login = z
	.object({
		email: z.string().email('Please enter a valid email').describe('Email Address'),
		password: z.string().describe('Password'),
	})
	.required();

export type Login = z.infer<typeof Login>;

export const UpdateProfile = z
	.object({
		firstName: z
			.string()
			.min(3, 'First Name should be atleast three (03) characters long')
			.max(30, 'First Name could be upto thirty (30) characters long')
			.describe('First Name')
			.optional(),
		lastName: z
			.string()
			.min(3, 'Last Name should be atleast three (03) characters long')
			.max(30, 'Last Name could be upto thirty (30) characters long')
			.describe('Last Name')
			.optional(),
		avatar: z.string().describe('Avatar').optional(),
		gender: z.string().describe('Gender ID').optional(),
		phone: Phone.describe('Phone Number').optional(),
	})
	.partial();
export type UpdateProfile = z.infer<typeof UpdateProfile>;

export const SignUp = UpdateProfile.merge(Login);
export type SignUp = z.infer<typeof SignUp>;

export const ChangePassword = z
	.object({
		oldPassword: z.string().describe('Old Password'),
		password: Password.describe('New Password'),
	})
	.required();

export type ChangePassword = z.infer<typeof ChangePassword>;
