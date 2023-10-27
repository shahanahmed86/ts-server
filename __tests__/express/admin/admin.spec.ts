import chai from 'chai';
import { changePassword, loggedIn, login, logout } from './admin.helper';
import { getCookieValue } from '../../helper';

const { expect } = chai;

describe('RESTful - Admin Authentication APIs', function () {
	it('admin login', async () => {
		let res = await login('invalid-email', 'fake'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);

		res = await login('fake@fake.com', 'fake'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(401);

		res = await login(); // should success
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.data).to.be.an('object');

		const cookie = getCookieValue(res.header);
		await logout(cookie);
	});

	it('admin loggedIn', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		const res = await loggedIn(cookie);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.data).to.be.an('object');

		await logout(cookie);
	});

	it('admin changePassword', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		let res = await changePassword('123abc456', 'shahan', cookie);
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);

		res = await changePassword('123Abc456', '123aBc456', cookie);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);

		res = await changePassword('123aBc456', '123Abc456', cookie);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);

		await logout(cookie);
	});
});
