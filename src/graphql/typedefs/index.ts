import rootSchema from './root.typedef';
import roleSchema from './role.typedef';
import genderSchema from './gender.typedef';
import adminSchema from './admin.typedef';
import userSchema from './user.typedef';
import authSchema from './auth.typedef';

const typeDefs = [rootSchema, roleSchema, genderSchema, adminSchema, userSchema, authSchema];

export default typeDefs;
