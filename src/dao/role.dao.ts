import { ROLE_TABLE } from '../database/constants';
import { Role, RoleDocument } from '../database/schemas/role.schema';
import BaseDao from './base.dao';

class RoleDao extends BaseDao<RoleDocument> {
	constructor() {
		super(Role, ROLE_TABLE);
	}
}

export default RoleDao;
