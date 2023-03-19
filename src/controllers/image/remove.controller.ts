import { ImageParams } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import file from '../../library/file.library';
import { translate } from '../../library/i18n.library';
import { NotFound } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import * as validation from '../../validation';

export const removeImage: Controller<string, ImageParams> = async (_, args) => {
	await joiValidator(validation.fileRef, args);

	if (!file.deleteOldFileLocally(args.filename)) {
		throw new NotFound('common.images.removeImageFailed');
	}

	return translate('common.images.removeImage');
};
