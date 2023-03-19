import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../src';

const BASE_URL = '/api/common';

chai.use(chaiHttp);

export const getGenders = () => chai.request(httpServer).get(`${BASE_URL}/genders`);
