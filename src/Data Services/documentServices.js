import { save, readAll, read, deleteAll, updateOne } from "../Access/mongo.js";
import { ObjectId } from "mongodb";

export const findDocuments = async (db, query) => {
	const maybeItems = await readAll(db, "Document", query);
	return await maybeItems.enforce();
}
export const saveDocument = async (db, owner, name) => {
	const maybeItem = await save(db, {name, owner, shared: [], datecreated: new Date(Date.now()) }, "Document");
	const item = await maybeItem.enforce();
	return item;
}
export const renameDocument = async (db, owner, id, name) => {
	const docOwner = (await (await read(db, "Document", { _id: ObjectId(id) })).enforce()).owner;
	if(owner === docOwner) {
		const maybeItem = await updateOne(db, "Document", ObjectId(id), { name });
		const item = await maybeItem.enforce();
		return item;
	} else {
		return false
	}
}
export const shareDocument = async (db, owner, id, to) => {
	const doc = await (await read(db, "Document", { _id: ObjectId(id) })).enforce();
	const docOwner = doc.owner;
	if(owner === docOwner) {
		let newshared = new Array(doc.shared);
		newshared.indexOf(to) === -1 ? newshared.push(to) : {};
		const maybeItem = await updateOne(db, "Document", ObjectId(id), { shared: newshared });
		const item = await maybeItem.enforce();
		return item;
	} else {
		return false
	}
}
export const deleteDocument = async (db, owner, id) => {
	const docOwner = (await (await read(db, "Document", { _id: ObjectId(id) })).enforce()).owner;
	if(owner === docOwner) {
		const result = await deleteAll(db, "Document", {_id: ObjectId(id)});
		return result
	} else {
		return false
	}
} 