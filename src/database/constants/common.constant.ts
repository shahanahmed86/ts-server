import { getISODate } from '../../utils/logics.util';

const now = getISODate();
export const common = { createdAt: now, updatedAt: now };
