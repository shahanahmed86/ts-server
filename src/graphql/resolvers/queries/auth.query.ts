import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const auth = {
	// admin
	adminLoggedIn: graphqlWrapper(controllers.users.loggedIn),

	// user
	userLoggedIn: graphqlWrapper(controllers.users.loggedIn),
};

export default auth;
