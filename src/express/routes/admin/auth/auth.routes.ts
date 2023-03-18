import express from 'express';
import controllers from '../../../../controllers';
import { ROLES } from '../../../../utils/constants.util';
import { restCatch } from '../../../../utils/errors.util';
import { formatResponse } from '../../../../utils/logics.util';
import { restWrapper } from '../../../../utils/wrappers.util';
import { auth, guest, includeRole } from '../../../middleware/auth.middleware';

const { admin } = ROLES;

const router = express.Router();

router.post('/', guest, includeRole(admin), async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.login)(...args);
		const result = formatResponse(200, 'auth.login', payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.use(auth(admin));

router.get('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.loggedIn)(...args);
		const result = formatResponse(200, 'auth.loggedIn', payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.put('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.updateProfile)(...args);
		const result = formatResponse(201, payload, null);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.put('/change-password', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.changePassword)(...args);
		const result = formatResponse(201, payload, null);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

export default router;
