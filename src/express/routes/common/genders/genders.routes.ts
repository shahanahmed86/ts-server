import express from 'express';
import { restWrapper } from '../../../../utils/wrappers.util';
import controllers from '../../../../controllers';

const router = express.Router();

router.get('/', restWrapper(controllers.genders.getGenders));

export default router;
