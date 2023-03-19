import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserArgs } from '../../../src/@types/api.type';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import * as userHelper from './user.helper';
import { uploadImage } from '../../images/images.helper';
import { GENDER_DATA } from '../../../src/typeorm/constants/gender.constant';
import { deleteUsers } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - User Authentication APIs', function () {
	it('user signup', async () => {
		const { body: imageBody } = await uploadImage();

		const { body } = await userHelper.signup({
			avatar: imageBody.data,
			firstName: 'Shahan',
			lastName: 'Ahmed Khan',
			genderId: GENDER_DATA[0]!.id!,
			phone: '+923332122588',
			email: 'shahan.khaan@gmail.com',
			password: '123Abc456',
		});
		['token', 'user'].map((prop) => expect(body.data.values).to.have.property(prop));
		expect(body.data.values.token).to.be.a('string');
		expect(body.data.values.user).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values.user).not.to.have.property(prop));
	});

	it('user login', async () => {
		const res = await userHelper.login('shahan.khaan@gmail.com', 'shahan'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body } = await userHelper.login(); // should success
		['token', 'user'].map((prop) => expect(body.data.values).to.have.property(prop));
		expect(body.data.values.token).to.be.a('string');
		expect(body.data.values.user).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values.user).not.to.have.property(prop));
	});

	it('user loggedIn', async () => {
		const { body: loginBody } = await userHelper.login();
		const token = loginBody.data.values.token;

		const { body } = await userHelper.loggedIn(token);
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));
	});

	it('user changePassword', async () => {
		const { body: loginBody } = await userHelper.login();
		const token = loginBody.data.values.token;

		let res = await userHelper.changePassword('123abc456', 'shahan', token);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		res = await userHelper.changePassword('123Abc456', '123aBc456', token);
		expect(res.body.data.values).to.be.a('string');

		res = await userHelper.changePassword('123aBc456', '123Abc456', token);
		expect(res.body.data.values).to.be.a('string');
	});

	it('user updateProfile', async () => {
		const { body: loginBody } = await userHelper.login();
		const token = loginBody.data.values.token;

		let res = await userHelper.updateProfile({}, token);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body: imageBody } = await uploadImage();

		const PAYLOAD: UserArgs = {
			firstName: 'first name',
			lastName: 'last name',
			avatar: imageBody.data,
			phone: '+923362122588',
			genderId: GENDER_DATA.at(-1)!.id!,
		};
		res = await userHelper.updateProfile(PAYLOAD, token);
		expect(res.body.data.values).to.be.a('string');
	});

	after(() => deleteUsers());
});
