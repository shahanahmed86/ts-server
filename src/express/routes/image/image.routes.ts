import express from 'express';
import controllers from '../../../controllers';

const imageRouter = express.Router();

imageRouter
	.route('/:filename?')
	.get(controllers.image.getImage)
	.post(controllers.image.upload)
	.delete(controllers.image.removeImage);

export default imageRouter;
