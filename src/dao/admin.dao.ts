import AppDataSource from '../typeorm';
import { ADMIN_TABLE } from '../typeorm/constants';
import { Admin } from '../typeorm/entities/admin.entity';
import BaseDao from './base.dao';

class AdminDao extends BaseDao<Admin> {}

const repository = AppDataSource.getRepository(Admin);
export const admin = new AdminDao(repository, ADMIN_TABLE);
