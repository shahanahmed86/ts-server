import { randomUUID } from 'crypto';
import { FormResponse } from '../@types/common.types';

export const formResponse: FormResponse = (status, message, data) => ({ status, message, data });

export const getUniqueId = () => randomUUID();
