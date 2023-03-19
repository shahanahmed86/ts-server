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

export const loggedIn = (token: string) => {
	return chai
		.request(httpServer)
		.get(BASE_URL)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`);
};

export const changePassword = async (oldPassword: string, password: string, token: string) => {
	return chai
		.request(httpServer)
		.put(`${BASE_URL}/change-password`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`)
		.send({ oldPassword, password });
};
