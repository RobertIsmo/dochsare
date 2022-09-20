import config from "../config/config.cjs";
import Maybe from "../../lib/maybe.js"
import mongo from "mongodb";
import crypto from 'node:crypto'

const client = new mongo.MongoClient(config.MONGODB_URL);

export const connect = async () => {
	console.log("Attempting to connect to MongoDB...");
	await client.connect().catch(e => {
		console.error("Failed to connect to MongoDB. ERROR:");
		throw Error(e.message);
	});
	console.log("Success in connecting to MongoDB. Proceed.");
	return { db: client.db(config.APP_NAME), client: client } 
}

export const save = async (db, object, resource) => {
	const documentCollection = db.collection(resource);
	const { acknowledged, insertedId } = await documentCollection.insertOne(object).catch(_=>undefined);
	if(acknowledged) {
		const item = await documentCollection.findOne({ _id: insertedId });
		return Maybe(item);
	} else return undefined
}
export const readAll = async(db, resource, query={}) => {
	const documentCollection = db.collection(resource);
	const results = await documentCollection.find(query).toArray().catch(_=>undefined);
	return Maybe(results);
}
export const read = async(db, resource, query={}) => {
	const documentCollection = db.collection(resource);
	const results = await documentCollection.findOne(query);
	return Maybe(results);
}
export const deleteAll = async (db, resource, query={}) => {
	const documentCollection = db.collection(resource);
	const results = await documentCollection.deleteMany(query).catch(_=>undefined);
	return Maybe(results);
}
export const updateOne = async (db, resource, id, object) => {
	const documentCollection = db.collection(resource);
	const newitem = await documentCollection.findOneAndUpdate({ _id: id }, object)
	return Maybe(newitem);

}



