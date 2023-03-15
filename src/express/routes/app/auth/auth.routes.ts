import express from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';
import { auth, guest, includeRole } from '../../../middleware/auth.middleware';
import { ROLES } from '../../../../utils/constants.util';
import { formatResponse } from '../../../../utils/logics.util';
import { restCatch } from '../../../../utils/errors.util';

const { user } = ROLES;

const router = express.Router();

router.post('/', guest, includeRole(user), async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.login)(...args);
		const result = formatResponse(200, "You've your login session", payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.post('/signup', guest, includeRole(user), async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.signup)(...args);
		const result = formatResponse(201, "You've successfully signed up", payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.use(auth(user));

router.get('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.loggedIn)(...args);
		const result = formatResponse(200, "You've your login session", payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.put('/', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.updateProfile)(...args);
		const result = formatResponse(201, "You've successfully updated your accounts", payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

router.put('/change-password', async (...args) => {
	const [, res] = args;
	try {
		const payload = await restWrapper(controllers.users.changePassword)(...args);
		const result = formatResponse(201, "You've successfully updated the password", payload);

		res.status(result.status).send(result);
	} catch (e) {
		restCatch(e, res);
	}
});

export default router;
