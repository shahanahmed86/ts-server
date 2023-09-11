import chai from 'chai';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import { changePassword, loggedIn, login } from './admin.helper';

const { expect } = chai;

describe('RESTful - Admin Authentication APIs', function () {
	it('admin login', async () => {
		let res = await login('shahan', 'shahan'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(401);

		res = await login(); // should success
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.data.token).to.be.a('string');
		expect(res.body.data).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body.data).not.to.have.property(prop));
	});

	it('admin loggedIn', async () => {
		await login();

		const res = await loggedIn();
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.data).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body).not.to.have.property(prop));
	});

	it('admin changePassword', async () => {
		await login();

		let res = await changePassword('123abc456', 'shahan');
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);

		res = await changePassword('123Abc456', '123aBc456');
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);

		res = await changePassword('123aBc456', '123Abc456');
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});
});
