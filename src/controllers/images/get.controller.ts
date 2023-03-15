import { Request } from 'express';
import file from '../../library/file.library';
import { joiValidator } from '../../utils/logics.util';
import * as validation from '../../validation';

export const getImage = async (req: Request) => {
	const args = Object.assign({}, req.params, req.query);
	await joiValidator(validation.fileRef, args);

	const { filename } = args;
	const path = file.getFilePath(filename);

	return { path, filename };
};
