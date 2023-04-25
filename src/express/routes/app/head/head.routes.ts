import express from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';
import { formatResponse } from '../../../../utils/logics.util';
import { restCatch } from '../../../../utils/errors.util';

const router = express.Router();

router.get('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.head.getHeads)(...args);
		const result = formatResponse(200, 'head.getHeads', payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

export default router;
