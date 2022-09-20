import { save, read, deleteAll } from "../Access/mongo.js";
import { ObjectId } from "mongodb";
import { hash } from "bcrypt";

export const findUserByUsername = async (db, username) => {
	const maybeUser = await read(db, "User", { username });
	const user = await maybeUser.enforce();
	return user
}
export const findUserByID = async (db, id) => {
	const maybeUser = await read(db, "User", { _id: ObjectId(id) });
	const user = await maybeUser.enforce();
	return user;
}
export const createNewUser = async (db, { username, email, password }) => {
	try {
		const hashedpassword = await hash(password, 12).catch(e => { throw e })
		const maybeUser = await save(db, { username, email, password: hashedpassword, datecreated: new Date(Date.now()) }, "User");
		const user = await maybeUser.enforce();
		return true
	} catch {
		return false
	}
}
export const deleteUserByID = async (db, id) => {
	const maybeResult = await deleteAll(db, "User", { _id: ObjectId(id) });
	const result = await maybeResult.enforce();
	return result
}