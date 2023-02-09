import { User } from '../typeorm/entities/user.entity';

export type AuthPayload = {
	token: string;
	user: User;
};
