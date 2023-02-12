import express from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';

const router = express.Router();

router
	.route('/:filename?')
	.get(controllers.images.getImage)
	.post(restWrapper(controllers.images.upload))
	.delete(restWrapper(controllers.images.removeImage));

export default router;
