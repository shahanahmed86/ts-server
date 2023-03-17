import AppDataSource from '../typeorm';
import { HEAD_TABLE } from '../typeorm/constants';
import { Heads } from '../typeorm/entities/heads.entity';
import BaseDao from './base.dao';

class HeadDao extends BaseDao<Heads> {}

const repository = AppDataSource.getRepository(Heads);
export const heads = new HeadDao(repository, HEAD_TABLE);
