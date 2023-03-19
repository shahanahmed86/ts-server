import chai from 'chai';
import chaiHttp from 'chai-http';
import { getGenders } from './common.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - Common APIs', function () {
	it('get genders', async () => {
		const res = await getGenders();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});
});
