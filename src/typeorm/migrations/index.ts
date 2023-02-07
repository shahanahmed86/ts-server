import { createUsers1675754567854 } from './1675754567854-create-users.migration';
import { createRoles1675779466160 } from './1675779466160-create-roles.migration';
import { addRoles1675780544875 } from './1675780544875-add-users.migration';

const migrations = [createUsers1675754567854, createRoles1675779466160, addRoles1675780544875];

export default migrations;
