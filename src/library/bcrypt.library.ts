import bcrypt from 'bcryptjs';
import configs from '../config';

const { salt } = configs.bcrypt;

export const hash = (str: string) => bcrypt.hash(str, +salt);
export const hashSync = (str: string) => bcrypt.hashSync(str, +salt);

export const compare = (str: string, hash: string) => bcrypt.compare(str, hash);
export const compareSync = (str: string, hash: string) => bcrypt.compareSync(str, hash);
