import { getISODate } from '../../utils/logics.util';

export const common = () => ({ createdAt: getISODate(), updatedAt: getISODate() });
