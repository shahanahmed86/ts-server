import { Router } from 'express';
import controllers from '../../../../controllers';
import { ROLES } from '../../../../utils/constants.util';
import { restWrapper } from '../../../../utils/wrappers.util';
import { auth, guest, includeRole } from '../../../middleware/auth.middleware';

const { admin } = ROLES;

const router = Router();

router.post('/', guest, includeRole(admin), restWrapper(controllers.admin.login, 'auth.login'));

router.use(auth(admin));

router.get('/', restWrapper(controllers.admin.loggedIn, 'auth.loggedIn'));

router.put(
	'/change-password',
	restWrapper(controllers.admin.changePassword, 'auth.changePassword'),
);

export default router;
