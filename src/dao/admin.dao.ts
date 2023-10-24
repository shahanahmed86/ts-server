import { ADMIN_TABLE } from '../database/constants';
import { Admin, AdminDocument } from '../database/schemas/admin.schema';
import BaseDao from './base.dao';

class AdminDao extends BaseDao<AdminDocument> {
	constructor() {
		super(Admin, ADMIN_TABLE);
	}
}

export default AdminDao;
