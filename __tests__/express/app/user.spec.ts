import chai from 'chai';
import { UserArgs } from '../../../src/@types/api.type';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import { uploadImage } from '../../images/images.helper';
import { changePassword, loggedIn, login, signup, updateProfile } from './user.helper';
import { deleteUsers } from '../../helper';

const { expect } = chai;

const SIGNUP_DATA: UserArgs = {
	firstName: 'Shahan Ahmed',
	lastName: 'Khan',
	phone: '+923362122588',
	genderId: '04521c7b-a128-4f5f-bfb2-96053c0a31b0',
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
		expect(res.body.data.token).to.be.a('string');
		expect(res.body.data).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body.data).not.to.have.property(prop));
	});

	it('app login', async () => {
		let res = await login('shahan', 'shahan'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(401);

		res = await login(); // should success
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.data.token).to.be.a('string');
		expect(res.body.data).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body.data).not.to.have.property(prop));
	});

	it('app loggedIn', async () => {
		await login();

		const res = await loggedIn();
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body).not.to.have.property(prop));
	});

	it('app updateProfile', async () => {
		await login();

		const { body: uploadedFile } = await uploadImage();

		const payload = Object.assign<UserArgs, UserArgs, UserArgs>({}, SIGNUP_DATA, {
			avatar: uploadedFile.data,
		});

		const res = await updateProfile(payload);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});

	it('app changePassword', async () => {
		await login();

		let res = await changePassword('123abc456', 'shahan');
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);

		res = await changePassword('123Abc456', '123aBc456');
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);

		res = await changePassword('123aBc456', '123Abc456');
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});

	after(() => deleteUsers());
});
