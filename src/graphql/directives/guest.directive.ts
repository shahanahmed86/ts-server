import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { Context } from '../../@types/wrapper.type';
import controllers from '../../controllers';
import { convertUnknownIntoError } from '../../utils/errors.util';

function GuestDirective(schema: GraphQLSchema, directiveName: string) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: function (field) {
			const directive = getDirective(schema, field, directiveName)?.[0];
			if (!directive) return field;

			const { resolve = defaultFieldResolver } = field;

			field.resolve = async (...args) => {
				const context = args[2] as Context;

				try {
					context.res.locals.role = directive.type;

					controllers.middleware.guestController(context.req);
				} catch (e) {
					const error = convertUnknownIntoError(e);
					throw new GraphQLError(error.message, { extensions: { code: error.status } });
				}

				return resolve.apply(this, args);
			};

			return field;
		},
	});
}

export default GuestDirective;
