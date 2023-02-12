import express from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';
import { auth, guest, includeRole } from '../../../middleware/auth.middleware';

const ROLE = 'admin';

const router = express.Router();

router.post('/', guest, includeRole(ROLE), restWrapper(controllers.users.login));

router.use(auth(ROLE));

router.get('/', restWrapper(controllers.users.loggedIn));
router.put('/', restWrapper(controllers.users.updateProfile));
router.put('/change-password', restWrapper(controllers.users.changePassword));

export default router;
