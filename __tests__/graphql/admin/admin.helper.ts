import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../src';
import * as schemas from './schemas';

chai.use(chaiHttp);

export const login = (email = 'admin@accounts.com.pk', password = '123Abc456') => {
	return chai.request(httpServer).post('/graphql').set('content-type', 'application/json').send({
		query: schemas.LOGIN,
		variables: { email, password },
	});
};

export const loggedIn = (cookie: string) => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.set('Cookie', cookie)
		.send({
			query: schemas.LOGGED_IN,
			variables: {},
		});
};

export const changePassword = async (oldPassword: string, password: string, cookie: string) => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.set('Cookie', cookie)
		.send({
			query: schemas.CHANGE_PASSWORD,
			variables: { oldPassword, password },
		});
};

export const logout = async (cookie: string) => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.set('Cookie', cookie)
		.send({
			query: schemas.LOGOUT,
			variables: {},
		});
};
