import { ADMIN_TABLE } from '../typeorm/constants';
import { Admin } from '../typeorm/entities/admin.entity';
import BaseDao from './base.dao';

class AdminDao extends BaseDao<Admin> {
	constructor() {
		super(Admin, ADMIN_TABLE);
	}
}

export default AdminDao;
