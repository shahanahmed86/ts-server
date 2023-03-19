import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserArgs } from '../../../src/@types/api.type';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import * as adminHelper from './admin.helper';
import { uploadImage } from '../../images/images.helper';
import { GENDERS_DATA } from '../../../src/typeorm/constants/genders.constant';

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

	it('admin updateProfile', async () => {
		const { body: loginBody } = await adminHelper.login();
		const token = loginBody.data.values.token;

		let res = await adminHelper.updateProfile({}, token);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body: imageBody } = await uploadImage();

		const PAYLOAD: UserArgs = {
			firstName: 'first name',
			lastName: 'last name',
			avatar: imageBody.data,
			phone: '+923131126908',
			genderId: GENDERS_DATA.at(-1)!.id!,
		};

		res = await adminHelper.updateProfile(PAYLOAD, token);
		expect(res.body.data.values).to.be.a('string');
	});
});
