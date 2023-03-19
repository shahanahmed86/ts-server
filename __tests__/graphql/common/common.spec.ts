import chai from 'chai';
import chaiHttp from 'chai-http';
import * as commonHelper from './common.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - Common APIs', function () {
	it('common getGenders', async () => {
		const res = await commonHelper.genders();
		expect(res.body.data.values).to.be.an('array');
	});
});
