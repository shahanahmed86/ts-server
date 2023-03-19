import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const auth = {
	// admin
	adminChangePassword: graphqlWrapper(controllers.admin.changePassword),
	adminLogin: graphqlWrapper(controllers.admin.login),

	// user
	userUpdateProfile: graphqlWrapper(controllers.user.updateProfile),
	userChangePassword: graphqlWrapper(controllers.user.changePassword),
	userLogin: graphqlWrapper(controllers.user.login),
	userSignup: graphqlWrapper(controllers.user.signup),
};

export default auth;
