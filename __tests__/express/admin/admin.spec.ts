import chai from 'chai';
import { UserArgs } from '../../../src/@types/api.type';
import { SHOULD_OMIT_PROPS } from '../../../src/utils/constants.util';
import { uploadImage } from '../../common/common.helper';
import { changePassword, loggedIn, login, updateProfile } from './admin.helper';

const { expect } = chai;

const UPDATE_PROFILE_DATA: UserArgs = {
	avatar: 'temp/uuid-filename.txt',
	firstName: 'Shahan',
	lastName: 'Ahmed Khan',
	phone: '+923422662425',
	genderId: '04521c7b-a128-4f5f-bfb2-96053c0a31b0',
};

describe('RESTful - Admin Authentication APIs', function () {
	it('admin login', async () => {
		let res = await login('shahan', 'shahan'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(401);

		res = await login(); // should success
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.data.token).to.be.a('string');
		['token', 'user'].map((prop) => expect(res.body.data).to.have.property(prop));
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body.data.user).not.to.have.property(prop));
	});

	it('admin loggedIn', async () => {
		const { body } = await login();
		const token = body.data.token;

		const res = await loggedIn(token);
		console.log('res.status', res.status);
		console.log('res.error', res.error);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		SHOULD_OMIT_PROPS.map((prop) => expect(res.body).not.to.have.property(prop));
	});

	// TODO this test case not working properly
	it('admin updateProfile', async () => {
		const { body } = await login();
		const token = body.data.token;

		const { body: uploadedFile } = await uploadImage();
		UPDATE_PROFILE_DATA.avatar = uploadedFile.data;

		const res = await updateProfile(UPDATE_PROFILE_DATA, token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(201);
	});

	it('admin changePassword', async () => {
		const { body } = await login();
		const token = body.data.token;

		let res = await changePassword('123abc456', 'shahan', token);
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);

		res = await changePassword('123Abc456', '123aBc456', token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(201);

		res = await changePassword('123aBc456', '123Abc456', token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(201);
	});
});
