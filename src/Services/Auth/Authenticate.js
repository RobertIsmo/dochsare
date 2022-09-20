import jwt from "../../../lib/jwt.js";
import * as userServices from "../../Data Services/userServices.js";
import { compare } from "bcrypt";

export const signUp = async (db, { username, email, password }) => {
	return await userServices.createNewUser(db, { username, email, password });
}
export const signIn = async (db, { username, password }) => {
	const user = await userServices.findUserByUsername(db, username);
	const result = await compare(password, user.password);
	if(result) return jwt.sign(user._id.toString());
	else return false;
}
export const UserByUsername = async (db, username) => {
	return await userServices.findUserByUsername(db, username);
}
export const UserByID = async (db, id) => {
	return await userServices.findUserByID(db, id);
}
export const deleteAccount = async (db, id) => {
	const result = await userServices.deleteUserByID(db, id);
	return result;
}
export const verifyUser = (user, accessToken, refreshToken) => {
	return jwt.verify(accessToken, refreshToken, user);
}