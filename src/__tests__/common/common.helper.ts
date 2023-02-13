import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../';

chai.use(chaiHttp);

export const healthcheck = () => chai.request(httpServer).get('/api/healthcheck');

export const uploadImage = (imagePath = './src/assets/appstore.png') => {
	return chai
		.request(httpServer)
		.post('/api/common/images')
		.set('content-type', 'multipart/form-data')
		.attach('uploadedFile', fs.readFileSync(imagePath), {
			contentType: 'image/png',
			filename: 'appstore.png',
		});
};

export const getImage = (filename: string) => {
	return chai.request(httpServer).get(`/api/common/images?filename=${filename}`);
};

export const deleteImage = (filename: string) => {
	return chai.request(httpServer).delete(`/api/common/images?filename=${filename}`);
};

export const getGenders = () => chai.request(httpServer).get('/api/common/genders');
