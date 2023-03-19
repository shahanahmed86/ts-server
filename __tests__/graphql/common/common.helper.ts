import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../src';
import * as schemas from './schemas';

chai.use(chaiHttp);

export const genders = async () => {
	return chai.request(httpServer).post('/graphql').set('content-type', 'application/json').send({
		query: schemas.GENDERS,
		variables: {},
	});
};
