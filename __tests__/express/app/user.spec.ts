import chai from 'chai';
import { UserArgs } from '../../../src/@types/api.type';
import { SIGNUP_DATA, UPDATE_USER_PROFILE, deleteUsers, getCookieValue } from '../../helper';
import { uploadImage } from '../../images/images.helper';
import { changePassword, loggedIn, login, logout, signup, updateProfile } from './user.helper';

const { expect } = chai;

describe('RESTful - App Authentication APIs', function () {
	it('app signup', async () => {
		const { body: uploadedFile } = await uploadImage();

		const payload: UserArgs = { ...SIGNUP_DATA, avatar: uploadedFile.data };
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

		const payload: UserArgs = { ...UPDATE_USER_PROFILE, avatar: uploadedFile.data };

		const res = await updateProfile(payload, cookie);
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
