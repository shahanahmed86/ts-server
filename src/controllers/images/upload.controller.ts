import { Controller } from '../../@types/wrapper.type';
import file from '../../library/file.library';
import { NotFound } from '../../utils/errors.util';

export const upload: Controller<string | string[], object> = async (_, __, { req }) => {
	if (!req.files) throw new NotFound('File attachment not found');
	return file.localUpload(req.files);
};
