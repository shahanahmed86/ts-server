import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const auth = {
	// admin
	adminUpdateProfile: graphqlWrapper(controllers.users.updateProfile),
	adminChangePassword: graphqlWrapper(controllers.users.changePassword),
	adminLogin: graphqlWrapper(controllers.users.login),

	// user
	userUpdateProfile: graphqlWrapper(controllers.users.updateProfile),
	userChangePassword: graphqlWrapper(controllers.users.changePassword),
	userLogin: graphqlWrapper(controllers.users.login),
	userSignup: graphqlWrapper(controllers.users.signup),
};

export default auth;
