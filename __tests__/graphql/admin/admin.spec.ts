import chai from 'chai';
import chaiHttp from 'chai-http';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import * as adminHelper from './admin.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - Admin Authentication APIs', function () {
	it('admin login', async () => {
		const res = await adminHelper.login('admin@accounts.com.pk', 'shahan'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body } = await adminHelper.login(); // should success
		['token', 'user'].map((prop) => expect(body.data.values).to.have.property(prop));
		expect(body.data.values.token).to.be.a('string');
		expect(body.data.values.user).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values.user).not.to.have.property(prop));
	});

	it('admin loggedIn', async () => {
		const { body: loginBody } = await adminHelper.login();
		const token = loginBody.data.values.token;

		const { body } = await adminHelper.loggedIn(token);
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));
	});

	it('admin changePassword', async () => {
		const { body: loginBody } = await adminHelper.login();
		const token = loginBody.data.values.token;

		let res = await adminHelper.changePassword('123abc456', 'shahan', token);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		res = await adminHelper.changePassword('123Abc456', '123aBc456', token);
		expect(res.body.data.values).to.be.a('string');

		res = await adminHelper.changePassword('123aBc456', '123Abc456', token);
		expect(res.body.data.values).to.be.a('string');
	});
});
