import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../src';

chai.use(chaiHttp);

const BASE_URL = '/api/admin/auth';

export const login = async (email = 'admin@accounts.com.pk', password = '123Abc456') => {
	return chai
		.request(httpServer)
		.post(BASE_URL)
		.set('content-type', 'application/json')
		.send({ email, password });
};

export const loggedIn = (cookie: string) => {
	return chai
		.request(httpServer)
		.get(BASE_URL)
		.set('content-type', 'application/json')
		.set('Cookie', cookie);
};

export const changePassword = async (oldPassword: string, password: string, cookie: string) => {
	return chai
		.request(httpServer)
		.put(`${BASE_URL}/change-password`)
		.set('content-type', 'application/json')
		.set('Cookie', cookie)
		.send({ oldPassword, password });
};

export const logout = async (cookie: string) => {
	return chai
		.request(httpServer)
		.delete(BASE_URL)
		.set('content-type', 'application/json')
		.set('Cookie', cookie);
};
