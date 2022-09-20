import config from './config/config.cjs';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from '@graphql-tools/mock';
import mocks from './mocks/mocks.js';
import Maybe from '../lib/maybe.js';
import MaybetypeDefs from "./graphql-schemas/schema.cjs";
import Mayberesolvers from "./graphql-resolvers/resolvers.js";
import addDirectives from "./graphql-directives/directives.js"

const level = config.NODE_ENV === 'dev' ? 'ignore' : 'warn';

const typeDefs = await (await MaybetypeDefs).enforce();
const resolvers = await Mayberesolvers.enforce();

const Maybeschema = Maybe(makeExecutableSchema({
	typeDefs,
	resolvers,
	resolverValidationOptions: { requireResolversForAllFields: level }
}))
const schema = await Maybeschema.enforce();
const Maybemockschema = Maybe(addMocksToSchema({
	schema,
	mocks,
	preserveResolvers: true
}))

export default addDirectives(config.MOCK === "on" ? Maybemockschema : Maybeschema)