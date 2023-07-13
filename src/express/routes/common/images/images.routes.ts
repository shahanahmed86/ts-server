import { NextFunction, Request, Response, Router } from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';
import { convertUnknownIntoError } from './../../../../utils/errors.util';

const router = Router();

router.get('/:filename?', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const image = await controllers.image.getImage(req);

		res.attachment(image.filename).send(image.path);
	} catch (e) {
		const error = convertUnknownIntoError(e);
		next(error);
	}
});

router
	.route('/')
	.post(restWrapper(controllers.image.upload, 'common.images.upload', 201))
	.delete(restWrapper(controllers.image.removeImage, 'common.images.removeImage'));

export default router;
