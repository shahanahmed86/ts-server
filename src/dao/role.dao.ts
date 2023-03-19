import AppDataSource from '../typeorm';
import { ROLE_TABLE } from '../typeorm/constants';
import { Role } from '../typeorm/entities/role.entity';
import BaseDao from './base.dao';

class RoleDao extends BaseDao<Role> {}

const repository = AppDataSource.getRepository(Role);
export const role = new RoleDao(repository, ROLE_TABLE);
