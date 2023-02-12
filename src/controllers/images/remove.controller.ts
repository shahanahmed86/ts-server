import { ImageParams } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import file from '../../library/file.library';
import { NotFound } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import * as validation from '../../validation';

export const removeImage: Controller<null, ImageParams> = async (_, args) => {
	await joiValidator(validation.fileRef, args);

	if (!file.deleteOldFileLocally(args.filename)) {
		throw new NotFound("Image has already been deleted or doesn't exists");
	}

	return formatResponse(200, 'Image deleted successfully', null);
};
