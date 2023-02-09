import { FindOneOptions, Repository } from 'typeorm';
import AppDataSource from '../typeorm';
import { Role } from '../typeorm/entities/role.entity';
import BaseDao from './base.dao';

class RoleDao extends BaseDao {
	model: Repository<Role>;
	modelName: string;

	constructor(model: Repository<Role>, modelName: string) {
		super();
		this.model = model;
		this.modelName = modelName;
	}

	findOne(findOption: FindOneOptions<Role>): Promise<Role | null> {
		return this.model.findOne(findOption);
	}
}

const roles = new RoleDao(AppDataSource.getRepository(Role), 'roles');

export default roles;
