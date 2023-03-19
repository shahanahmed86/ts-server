import controllers from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrappers.util';

const common = {
	genders: graphqlWrapper(controllers.genders.getGenders),
};

export default common;
