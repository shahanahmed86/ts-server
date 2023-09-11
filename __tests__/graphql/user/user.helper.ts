import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../src';
import { UserArgs } from '../../../src/@types/api.type';
import * as schemas from './schemas';

chai.use(chaiHttp);

export const login = (email = 'shahan.khaan@gmail.com', password = '123Abc456') => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.withCredentials()
		.send({
			query: schemas.LOGIN,
			variables: { email, password },
		});
};

export const loggedIn = () => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.withCredentials()
		.send({
			query: schemas.LOGGED_IN,
			variables: {},
		});
};

export const changePassword = async (oldPassword: string, password: string) => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.withCredentials()
		.send({
			query: schemas.CHANGE_PASSWORD,
			variables: { oldPassword, password },
		});
};

export const updateProfile = async (payload: UserArgs) => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.withCredentials()
		.send({
			query: schemas.UPDATE_PROFILE,
			variables: payload,
		});
};

export const signup = async (payload: UserArgs) => {
	return chai
		.request(httpServer)
		.post('/graphql')
		.set('content-type', 'application/json')
		.withCredentials()
		.send({
			query: schemas.SIGNUP,
			variables: payload,
		});
};
