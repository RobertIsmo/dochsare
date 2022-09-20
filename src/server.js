import config from './config/config.cjs';
import express from 'express';
import cookieParser from 'cookie-parser';
import { graphqlHTTP } from 'express-graphql';
import { connect } from './Access/mongo.js';
import { init } from './Access/minio.js';
import Maybeschema from './graphql.js'

import authenticationMiddlware from './middlewares/authenticateRequestMiddleware.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js'
import morgan from 'morgan';
import cors from 'cors';

const server = express();
const schema = await (await Maybeschema).enforce();

const { db } = await connect();
await init();

server.use(cookieParser())
server.use(cors())
server.use(express.json())
//server.use(loggerMiddleware);
server.use(morgan("combined"));
server.use(authenticationMiddlware);
server.use('/api', graphqlHTTP(async (req, res) => {
	return {
		schema,
		graphiql: config.NODE_ENV === "dev",
		context: {
			UserIdentity: req.UserIdentity,
			response: res,
			db
		}
	}
}))

const start = () => {
	console.log(`Running app in NODE_ENV: ${config.NODE_ENV}`);
	console.log("Attempting a start.");
	server.listen(config.PORT, async () => {
		console.log("Server start Successful.");
		if(config.NODE_ENV === "dev") {
			console.log(`Graphiql endpoint at http://localhost:${config.PORT}/api`);
		}
	})
}

export default {
	start
}