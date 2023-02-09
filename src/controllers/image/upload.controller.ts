import { Request, Response } from 'express';
import file from '../../library/file.library';
import { NotFound, restCatch } from '../../utils/errors.util';

const upload = async (req: Request, res: Response) => {
	try {
		if (!req.files) throw new NotFound('File attachment not found');

		const path = await file.localUpload(req.files);

		const payload = { path };
		res.send(payload);
	} catch (e) {
		restCatch(e, res);
	}
};

export default upload;
