import omit from 'lodash/omit';
import { PopulateOptions } from 'mongoose';
import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { RoleDocument } from '../../database/schemas';
import { COMMON_OMIT_FIELDS } from '../../utils/constants.util';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { Login } from '../../validations';

const includeRole: PopulateOptions = { path: 'role', select: COMMON_OMIT_FIELDS };

export const login: Controller<AuthPayload, LoginArgs> = async (_, _args, { req, res }) => {
	const args = await validateRequest(Login, _args);

	const adminDao = new Dao.Admin();

	const admin = await adminDao.findOne(
		{ email: args.email, 'role.deletedAt': null, 'role.deletedBy': null },
		{ populate: [includeRole] },
	);
	if (!admin) throw new NotAuthenticated();

	const role = admin.role as RoleDocument;
	if (role.name !== res.locals.role) {
		throw new NotAuthorized(['auth.insufficientPriviledge', role.name]);
	}

	const isMatched = await admin.matchPassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = { userId: admin.id, role: role.name };
	req.session.payload = payload;

	return omit(admin, ['password']);
};
