import bcrypt from 'bcryptjs';
import configs from '../config';

const { BCRYPT_SALT } = configs.BASE_CONFIG;

type HashSync = (salt: string) => string;
export const hashSync: HashSync = (salt) => bcrypt.hashSync(salt, BCRYPT_SALT);

type CompareSync = (salt: string, hash: string) => boolean;
export const compareSync: CompareSync = (salt, hash) => bcrypt.compareSync(salt, hash);
