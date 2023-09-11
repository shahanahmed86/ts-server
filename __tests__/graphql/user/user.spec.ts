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
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));
	});

	it('user login', async () => {
		const res = await userHelper.login('shahan.khaan@gmail.com', 'shahan'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body } = await userHelper.login(); // should success
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));
	});

	it('user loggedIn', async () => {
		await userHelper.login();

		const { body } = await userHelper.loggedIn();
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));
	});

	it('user changePassword', async () => {
		await userHelper.login();

		let res = await userHelper.changePassword('123abc456', 'shahan');
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		res = await userHelper.changePassword('123Abc456', '123aBc456');
		expect(res.body.data.values).to.be.a('string');

		res = await userHelper.changePassword('123aBc456', '123Abc456');
		expect(res.body.data.values).to.be.a('string');
	});

	it('user updateProfile', async () => {
		await userHelper.login();

		let res = await userHelper.updateProfile({});
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body: imageBody } = await uploadImage();

		const PAYLOAD: UserArgs = {
			firstName: 'first name',
			lastName: 'last name',
			avatar: imageBody.data,
			phone: '+923362122588',
			genderId: GENDER_DATA.at(-1)!.id!,
		};
		res = await userHelper.updateProfile(PAYLOAD);
		expect(res.body.data.values).to.be.a('string');
	});

	after(() => deleteUsers());
});
