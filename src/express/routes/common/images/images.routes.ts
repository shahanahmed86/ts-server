import { restCatch } from './../../../../utils/errors.util';
import express from 'express';
import controllers from '../../../../controllers';
import { formatResponse } from '../../../../utils/logics.util';
import { restWrapper } from '../../../../utils/wrappers.util';

const router = express.Router();

router
	.route('/:filename?')
	.get(async (req, res) => {
		try {
			const { filename, path } = await controllers.images.getImage(req);

			res.attachment(filename).send(path);
		} catch (e) {
			restCatch(e, res);
		}
	})
	.post(async (...args) => {
		const [, res] = args;
		try {
			const payload = await restWrapper(controllers.images.upload)(...args);
			const result = formatResponse(201, 'Image uploaded successfully', payload);

			res.status(result.status).send(result);
		} catch (e) {
			restCatch(e, res);
		}
	})
	.delete(async (...args) => {
		const [, res] = args;
		try {
			const payload = await restWrapper(controllers.images.removeImage)(...args);
			const result = formatResponse(200, 'Image deleted successfully', payload);

			res.status(result.status).send(result);
		} catch (e) {
			restCatch(e, res);
		}
	});

export default router;
