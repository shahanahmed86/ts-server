import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const auth = {
	// admin
	adminLoggedIn: graphqlWrapper(controllers.admin.loggedIn),

	// user
	userLoggedIn: graphqlWrapper(controllers.user.loggedIn),
};

export default auth;
