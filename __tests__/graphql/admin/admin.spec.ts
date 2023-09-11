import chai from 'chai';
import chaiHttp from 'chai-http';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import { login, logout, loggedIn, changePassword } from './admin.helper';
import { getCookieValue } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - Admin Authentication APIs', function () {
	it('admin login', async () => {
		const res = await login('admin@accounts.com.pk', 'shahan'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body, header } = await login(); // should success
		const cookie = getCookieValue(header);

		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));

		await logout(cookie);
	});

	it('admin loggedIn', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		const { body } = await loggedIn(cookie);
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));

		await logout(cookie);
	});

	it('admin changePassword', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		let res = await changePassword('123abc456', 'shahan', cookie);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		res = await changePassword('123Abc456', '123aBc456', cookie);
		expect(res.body.data.values).to.be.a('string');

		res = await changePassword('123aBc456', '123Abc456', cookie);
		expect(res.body.data.values).to.be.a('string');

		await logout(cookie);
	});
});
