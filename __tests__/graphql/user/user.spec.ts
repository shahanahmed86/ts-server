import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserArgs } from '../../../src/@types/api.type';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import { signup, login, logout, loggedIn, changePassword, updateProfile } from './user.helper';
import { uploadImage } from '../../images/images.helper';
// import { GENDER_DATA } from '../../../src/database/constants/gender.constant';
import { deleteUsers, getCookieValue } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - User Authentication APIs', function () {
	it('user signup', async () => {
		const { body: imageBody } = await uploadImage();

		const { body } = await signup({
			avatar: imageBody.data,
			firstName: 'Shahan',
			lastName: 'Ahmed Khan',
			// genderId: GENDER_DATA[0]!.id!, // TODO need to change it
			phone: '+923332122588',
			email: 'shahan.khaan@gmail.com',
			password: '123Abc456',
		});
		expect(body.data.values).to.be.a('string');
	});

	it('user login', async () => {
		const res = await login('shahan.khaan@gmail.com', 'fake'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body, header } = await login(); // should success
		const cookie = getCookieValue(header);

		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));

		await logout(cookie);
	});

	it('user loggedIn', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		const { body } = await loggedIn(cookie);
		expect(body.data.values).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(body.data.values).not.to.have.property(prop));

		await logout(cookie);
	});

	it('user changePassword', async () => {
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

	it('user updateProfile', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		let res = await updateProfile({}, cookie);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body: imageBody } = await uploadImage();

		const PAYLOAD: UserArgs = {
			firstName: 'first name',
			lastName: 'last name',
			avatar: imageBody.data,
			phone: '+923362122588',
			// genderId: GENDER_DATA.at(-1)!.id!, // TODO need to change it
		};
		res = await updateProfile(PAYLOAD, cookie);
		expect(res.body.data.values).to.be.a('string');

		await logout(cookie);
	});

	after(() => deleteUsers());
});
