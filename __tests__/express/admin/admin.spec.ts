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
		['token', 'user'].map((prop) => expect(res.body.data).to.have.property(prop));
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body.data.user).not.to.have.property(prop));
	});

	it('admin loggedIn', async () => {
		const { body } = await login();
		const token = body.data.token;

		const res = await loggedIn(token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body).not.to.have.property(prop));
	});

	it('admin changePassword', async () => {
		const { body } = await login();
		const token = body.data.token;

		let res = await changePassword('123abc456', 'shahan', token);
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);

		res = await changePassword('123Abc456', '123aBc456', token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(201);

		res = await changePassword('123aBc456', '123Abc456', token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(201);
	});
});
