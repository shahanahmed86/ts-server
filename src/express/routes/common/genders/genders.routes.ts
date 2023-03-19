import express from 'express';
import controllers from '../../../../controllers';
import { restCatch } from '../../../../utils/errors.util';
import { formatResponse } from '../../../../utils/logics.util';
import { restWrapper } from '../../../../utils/wrappers.util';

const router = express.Router();

router.get('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.gender.getGenders)(...args);
		const result = formatResponse(200, 'common.genders.getGenders', payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

export default router;
