import Maybe from "../../lib/maybe.js";
import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { GraphQLScalarType, Kind } from 'graphql'
import signup from "./resolvers/signup.js";
import deleteUser from "./resolvers/deleteUser.js";
import signin from "./resolvers/signin.js";
import me from "./resolvers/me.js"
import { get, put } from "./resolvers/storage.js";
import { myDocuments, sharedDocuments, createDocument, changeDocument, deleteDocument, shareDocument } from "./resolvers/documents.js";

const resolver =  {
	Query: {
		me,
		signin,
		get,
		put,
		myDocuments,
		sharedDocuments
	},
	Mutation: {
		signup,
		deleteUser,
		changeDocument,
		deleteDocument,
		changeDocument,
		shareDocument,
	},
	Date: new GraphQLScalarType({
		name: "Date",
		description: "A teller of time.",
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return value
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(+ast.value) // ast value is always in string format
			}
			return null
		}
	})
}

const middleware = {
}

export default Maybe(composeResolvers(resolver, middleware));