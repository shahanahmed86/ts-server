import { Router } from 'express';
import controllers from '../../../../controllers';
import { ROLES } from '../../../../utils/constants.util';
import { restWrapper } from '../../../../utils/wrappers.util';
import { auth, guest, includeRole } from '../../../middleware/auth.middleware';

const { user } = ROLES;

const router = Router();

router.post('/', guest, includeRole(user), restWrapper(controllers.user.login, 'auth.login'));

router.post(
	'/signup',
	guest,
	includeRole(user),
	restWrapper(controllers.user.signup, 'auth.signup', 201),
);

router.use(auth(user));

router
	.route('/')
	.get(restWrapper(controllers.user.loggedIn, 'auth.loggedIn'))
	.put(restWrapper(controllers.user.updateProfile, 'auth.updateProfile'));

router.put('/change-password', restWrapper(controllers.user.changePassword, 'auth.changePassword'));

export default router;
