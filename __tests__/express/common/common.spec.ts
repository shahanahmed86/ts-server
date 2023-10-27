import chai from 'chai';
import chaiHttp from 'chai-http';
import { getGenders, getRoles } from './common.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - Common APIs', function () {
	it('get genders', async () => {
		const res = await getGenders();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});

	it('get roles', async () => {
		const res = await getRoles();

		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});
});
