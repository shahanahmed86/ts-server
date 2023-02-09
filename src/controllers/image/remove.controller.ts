// import { joiValidator } from '../../utils/logics.util';
// import { common } from '../../validations';

import { Request, Response } from 'express';
import file from '../../library/file.library';
import { NotFound, restCatch } from '../../utils/errors.util';

const removeImage = async (req: Request, res: Response) => {
	try {
		const args = Object.assign({}, req.params, req.query);
		// await joiValidator(common.fileRef, args);

		if (file.deleteOldFileLocally(args.filename)) res.send('Image deleted successfully');
		else throw new NotFound("Image has already been deleted or doesn't exists");
	} catch (e) {
		restCatch(e, res);
	}
};

export default removeImage;
