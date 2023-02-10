import AppDataSource from '../typeorm';
import { ROLE_TABLE } from '../typeorm/constants';
import { Roles } from '../typeorm/entities/roles.entity';
import BaseDao from './base.dao';

class RolesDao extends BaseDao<Roles> {}

const repository = AppDataSource.getRepository(Roles);
export const roles = new RolesDao(repository, ROLE_TABLE);
