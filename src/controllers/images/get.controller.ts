import { Request, Response } from 'express';
import file from '../../library/file.library';
import { restCatch } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import * as validation from '../../validation';

export const getImage = async (req: Request, res: Response) => {
	try {
		const args = Object.assign({}, req.params, req.query);
		await joiValidator(validation.fileRef, args);

		const filePath = file.getFilePath(args.filename);
		res.attachment(args.filename).send(filePath);
	} catch (e) {
		restCatch(e, res);
	}
};
