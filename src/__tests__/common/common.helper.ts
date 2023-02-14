import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../';

const BASE_URL = '/api/common';

chai.use(chaiHttp);

export const healthcheck = () => chai.request(httpServer).get('/api/healthcheck');

export const uploadImage = (imagePath = './src/assets/appstore.png') => {
	return chai
		.request(httpServer)
		.post(`${BASE_URL}/images`)
		.set('content-type', 'multipart/form-data')
		.attach('uploadedFile', fs.readFileSync(imagePath), {
			contentType: 'image/png',
			filename: 'appstore.png',
		});
};

export const getImage = (filename: string) => {
	return chai.request(httpServer).get(`${BASE_URL}/images?filename=${filename}`);
};

export const deleteImage = (filename: string) => {
	return chai.request(httpServer).delete(`${BASE_URL}/images?filename=${filename}`);
};

export const getGenders = () => chai.request(httpServer).get(`${BASE_URL}/genders`);
