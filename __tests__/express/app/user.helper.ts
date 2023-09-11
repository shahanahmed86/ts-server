import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../src';
import { UserArgs } from '../../../src/@types/api.type';

chai.use(chaiHttp);

const BASE_URL = '/api/app/auth';

export const signup = async (payload: UserArgs) => {
	return chai
		.request(httpServer)
		.post(`${BASE_URL}/signup`)
		.set('content-type', 'application/json')
		.withCredentials()
		.send(payload);
};

export const login = async (email = 'shahan.khaan@gmail.com', password = '123Abc456') => {
	return chai
		.request(httpServer)
		.post(BASE_URL)
		.set('content-type', 'application/json')
		.withCredentials()
		.send({ email, password });
};

export const loggedIn = () => {
	return chai
		.request(httpServer)
		.get(BASE_URL)
		.set('content-type', 'application/json')
		.withCredentials();
};

export const updateProfile = async (payload: UserArgs) => {
	return chai
		.request(httpServer)
		.put(BASE_URL)
		.set('content-type', 'application/json')
		.withCredentials()
		.send(payload);
};

export const changePassword = async (oldPassword: string, password: string) => {
	return chai
		.request(httpServer)
		.put(`${BASE_URL}/change-password`)
		.set('content-type', 'application/json')
		.withCredentials()
		.send({ oldPassword, password });
};
