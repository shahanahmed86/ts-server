import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const auth = {
	// admin
	adminChangePassword: graphqlWrapper(controllers.admin.changePassword),
	adminLogin: graphqlWrapper(controllers.admin.login),
	adminLogout: graphqlWrapper(controllers.admin.logout),

	// user
	userUpdateProfile: graphqlWrapper(controllers.user.updateProfile),
	userChangePassword: graphqlWrapper(controllers.user.changePassword),
	userLogin: graphqlWrapper(controllers.user.login),
	userSignup: graphqlWrapper(controllers.user.signup),
	userLogout: graphqlWrapper(controllers.user.logout),
};

export default auth;
