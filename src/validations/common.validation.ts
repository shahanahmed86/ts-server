import * as z from 'zod';
import configs from '../config';
import { PASSWORD_REGEX, PHONE_REGEX } from '../utils/constants.util';

const maxBytes = +configs.bcrypt.maxBytes;

export const Password = z
	.string()
	.trim()
	.max(maxBytes, `Password length cannot exceed from ${maxBytes}`)
	.regex(PASSWORD_REGEX, 'Password must contain at least one uppercase/lowercase/digit');

export type Password = z.infer<typeof Password>;

export const Phone = z.string().regex(PHONE_REGEX, 'Phone number must have 10 digits');

export type Phone = z.infer<typeof Phone>;

export const FileRef = z.object({
	filename: z.string().describe('Filename'),
});

export type FileRef = z.infer<typeof FileRef>;
