import { ROLE_TABLE } from '../typeorm/constants';
import { Role } from '../typeorm/entities/role.entity';
import BaseDao from './base.dao';

class RoleDao extends BaseDao<Role> {
	constructor() {
		super(Role, ROLE_TABLE);
	}
}

export default RoleDao;
