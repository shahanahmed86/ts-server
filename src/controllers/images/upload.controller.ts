import { Controller } from '../../@types/wrapper.type';
import file from '../../library/file.library';
import { NotFound } from '../../utils/errors.util';
import { formatResponse } from '../../utils/logics.util';

export const upload: Controller<string | string[]> = async (_, __, { req }) => {
	if (!req.files) throw new NotFound('File attachment not found');

	const path = await file.localUpload(req.files);
	return formatResponse(201, 'Image uploaded successfully', path);
};
