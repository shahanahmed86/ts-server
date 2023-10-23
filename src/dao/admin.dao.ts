import { ADMIN_TABLE } from '../database/constants';
import { AdminModel } from '../database/schemas/admin.schema';
import BaseDao from './base.dao';

class AdminDao extends BaseDao<Admin> {
	constructor() {
		super(AdminModel, ADMIN_TABLE);
	}
}

export default AdminDao;
