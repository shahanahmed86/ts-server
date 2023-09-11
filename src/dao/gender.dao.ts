import { GENDER_TABLE } from '../typeorm/constants';
import { Gender } from '../typeorm/entities/gender.entity';
import BaseDao from './base.dao';

class GenderDao extends BaseDao<Gender> {
	constructor() {
		super(Gender, GENDER_TABLE);
	}
}

export default GenderDao;
