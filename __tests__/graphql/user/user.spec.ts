import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserArgs } from '../../../src/@types/api.type';
import { SIGNUP_DATA, UPDATE_USER_PROFILE, deleteUsers, getCookieValue } from '../../helper';
import { uploadImage } from '../../images/images.helper';
import { changePassword, loggedIn, login, logout, signup, updateProfile } from './user.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - User Authentication APIs', function () {
	it('user signup', async () => {
		const { body: imageBody } = await uploadImage();

		const payload: UserArgs = { ...SIGNUP_DATA, avatar: imageBody.data };

		const { body } = await signup(payload);
		expect(body.data.values).to.be.a('string');
	});

	it('user login', async () => {
		const res = await login('shahan.khaan@gmail.com', 'fake'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body, header } = await login(); // should success
		const cookie = getCookieValue(header);

		expect(body.data.values).to.be.an('object');

		await logout(cookie);
	});

	it('user loggedIn', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		const { body } = await loggedIn(cookie);
		expect(body.data.values).to.be.an('object');

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

		const payload: UserArgs = { ...UPDATE_USER_PROFILE, avatar: imageBody.data };

		res = await updateProfile(payload, cookie);
		expect(res.body.data.values).to.be.a('string');

		await logout(cookie);
	});

	after(() => deleteUsers());
});
