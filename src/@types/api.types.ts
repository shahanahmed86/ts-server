import { Users } from '../typeorm/entities/users.entity';

export type AuthPayload = {
	token: string;
	user: Users;
};

export type ImageParams = {
	filename: string;
};
