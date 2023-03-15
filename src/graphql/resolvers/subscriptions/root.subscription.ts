import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../../library/pubsub.library';
import triggers from './triggers.subscription';

type Payload = { foo: string };
type Variables = { bar: string };

/**
 * give the callback, `() => pubsub.asyncIterator(triggers.FOO)`, to subscribe
 * instead of withFilter, if filtering isn't required
 */
export const foo = {
	subscribe: withFilter(
		() => pubsub.asyncIterator<string>(triggers.FOO),
		(payload: Payload, variables: Variables) => payload.foo === variables.bar,
	),
};
