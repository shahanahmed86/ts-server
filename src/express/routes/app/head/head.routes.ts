import express from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';
import { formatResponse } from '../../../../utils/logics.util';
import { restCatch } from '../../../../utils/errors.util';
import { auth } from '../../../middleware/auth.middleware';
import { ROLES } from '../../../../utils/constants.util';

const { user } = ROLES;

const router = express.Router();

router.use(auth(user));

router.get('/:parentId?', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.head.getHeads)(...args);
		const result = formatResponse(200, 'head.getHeads', payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.post('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.head.addHead)(...args);
		const result = formatResponse(201, 'head.addHead', payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

export default router;
