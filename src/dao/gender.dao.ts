import AppDataSource from '../typeorm';
import { GENDER_TABLE } from '../typeorm/constants';
import { Gender } from '../typeorm/entities/gender.entity';
import BaseDao from './base.dao';

class GenderDao extends BaseDao<Gender> {}

const repository = AppDataSource.getRepository(Gender);
export const gender = new GenderDao(repository, GENDER_TABLE);
