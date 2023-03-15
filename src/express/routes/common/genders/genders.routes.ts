import express from 'express';
import { restWrapper } from '../../../../utils/wrappers.util';
import controllers from '../../../../controllers';
import { formatResponse } from '../../../../utils/logics.util';
import { restCatch } from '../../../../utils/errors.util';

const router = express.Router();

router.get('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.genders.getGenders)(...args);
		const result = formatResponse(200, "You've successfully fetched genders", payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

export default router;
