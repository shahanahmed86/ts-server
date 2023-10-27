import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { UserArgs } from '../../../src/@types/api.type';
import { signup, login, logout, loggedIn, changePassword, updateProfile } from './user.helper';
import { uploadImage } from '../../images/images.helper';
import { deleteUsers, getCookieValue } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

export const SIGNUP_DATA: UserArgs = {
	firstName: 'Shahan Ahmed',
	lastName: 'Khan',
	phone: '+923362122588',
	gender: new mongoose.mongo.ObjectId('6537b3e9d964549cf9dda262'),
};

describe('Graphql - User Authentication APIs', function () {
	it('user signup', async () => {
		const { body: imageBody } = await uploadImage();

		const { body } = await signup({ ...SIGNUP_DATA, avatar: imageBody.data });
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

		const PAYLOAD: UserArgs = {
			firstName: 'Shahan Ahmed updated',
			lastName: 'Khan updated',
			avatar: imageBody.data,
			phone: '+923131126908',
			gender: new mongoose.mongo.ObjectId('6537b4a305c9c80435922c5f'),
		};
		res = await updateProfile(PAYLOAD, cookie);
		expect(res.body.data.values).to.be.a('string');

		await logout(cookie);
	});

	after(() => deleteUsers());
});
