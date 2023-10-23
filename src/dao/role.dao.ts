import { ROLE_TABLE } from '../database/constants';
import { Role } from '../database/schemas/role.schema';
import BaseDao from './base.dao';

class RoleDao extends BaseDao<Role> {
	constructor() {
		super(Role, ROLE_TABLE);
	}
}

export default RoleDao;
