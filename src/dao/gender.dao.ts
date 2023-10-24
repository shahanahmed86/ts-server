import { GENDER_TABLE } from '../database/constants';
import { Gender, GenderDocument } from '../database/schemas/gender.schema';
import BaseDao from './base.dao';

class GenderDao extends BaseDao<GenderDocument> {
	constructor() {
		super(Gender, GENDER_TABLE);
	}
}

export default GenderDao;
