import express from 'express';
import { AuthPayload } from '../../../../@types/api.types';
import controllers from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrappers.util';
import { guest } from '../../../middleware/auth.middleware';

const router = express.Router();

router.post('/signup', guest, restWrapper<AuthPayload>(controllers.users.signup));

export default router;
