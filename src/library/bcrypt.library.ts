import bcrypt from 'bcryptjs';
import configs from '../config';

const { salt } = configs.bcrypt;

export const hashSync = (str: string) => bcrypt.hashSync(str, +salt);

export const compareSync = (str: string, hash: string) => bcrypt.compareSync(str, hash);
