import mongoose from 'mongoose';
import chai from 'chai';
import { UserArgs } from '../../../src/@types/api.type';
import { uploadImage } from '../../images/images.helper';
import { changePassword, loggedIn, login, logout, signup, updateProfile } from './user.helper';
import { deleteUsers, getCookieValue } from '../../helper';

const { expect } = chai;

export const SIGNUP_DATA: UserArgs = {
	firstName: 'Shahan Ahmed',
	lastName: 'Khan',
	phone: '+923362122588',
	gender: new mongoose.mongo.ObjectId('6537b3e9d964549cf9dda262'),
};

describe('RESTful - App Authentication APIs', function () {
	it('app signup', async () => {
		const { body: uploadedFile } = await uploadImage();

		const payload = Object.assign<UserArgs, UserArgs, UserArgs>({}, SIGNUP_DATA, {
			avatar: uploadedFile.data,
			email: 'shahan.khaan@gmail.com',
			password: '123Abc456',
		});
		const res = await signup(payload); // should success
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(201);
		expect(res.body.data).to.be.a('string');
	});

	it('app login', async () => {
		let res = await login('fake', 'fake'); // should fail
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

	it('app loggedIn', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		const res = await loggedIn(cookie);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');

		await logout(cookie);
	});

	it('app updateProfile', async () => {
		const { header } = await login();
		const cookie = getCookieValue(header);

		const { body: uploadedFile } = await uploadImage();

		const PAYLOAD: UserArgs = {
			firstName: 'Shahan Ahmed updated',
			lastName: 'Khan updated',
			avatar: uploadedFile.data,
			phone: '+923131126908',
			gender: new mongoose.mongo.ObjectId('6537b4a305c9c80435922c5f'),
		};

		const res = await updateProfile(PAYLOAD, cookie);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);

		await logout(cookie);
	});

	it('app changePassword', async () => {
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

	after(() => deleteUsers());
});
