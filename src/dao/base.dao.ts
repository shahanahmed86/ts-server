import { FindOneOptions, FindOptionsWhere } from 'typeorm';

class BaseDao {
	preWhere(options: object): void {
		Object.assign(options, { where: { deletedAt: null } });
	}
}

export default BaseDao;
