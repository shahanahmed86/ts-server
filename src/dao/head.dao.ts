import AppDataSource from '../typeorm';
import { HEAD_TABLE } from '../typeorm/constants';
import { Head } from '../typeorm/entities/head.entity';
import BaseDao from './base.dao';

class HeadDao extends BaseDao<Head> {}

const repository = AppDataSource.getRepository(Head);
export const head = new HeadDao(repository, HEAD_TABLE);
