import { Router } from 'express';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';

const router = Router();

router.get('/', restWrapper(controllers.role.getRoles, 'common.roles.getRoles'));

export default router;
