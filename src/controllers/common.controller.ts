import os from 'os';
import { GenderOption, GENDER_OPTIONS, LoginType, LOGIN_TYPES } from '../utils/constants.util';

export const healthcheck = async (): Promise<string> => `I am healthy at ${os.hostname()}`;

export const getGenders = (): GenderOption[] => GENDER_OPTIONS;

export const getLoginTypes = (): LoginType[] => LOGIN_TYPES;
