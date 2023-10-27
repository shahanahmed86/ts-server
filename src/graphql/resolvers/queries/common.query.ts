import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const common = {
	genders: graphqlWrapper(controllers.gender.getGenders),
	roles: graphqlWrapper(controllers.role.getRoles),
};

export default common;
