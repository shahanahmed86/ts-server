import AppDataSource from '../typeorm';
import { GENDER_TABLE } from '../typeorm/constants';
import { Genders } from '../typeorm/entities/genders.entity';
import BaseDao from './base.dao';

class GenderDao extends BaseDao<Genders> {}

const repository = AppDataSource.getRepository(Genders);
export const genders = new GenderDao(repository, GENDER_TABLE);
