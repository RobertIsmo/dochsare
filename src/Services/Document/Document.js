import * as doc from "../../Data Services/documentServices.js";
import { getURL } from "../Storage/StorageServices.js";
export const documentsOwnedBy = async (db, user) => {
	const docs = await doc.findDocuments(db, { owner: user });
	return docs.map(async x => {
		const location = await getURL(x.name);
		return {
			...x,
			location
		}
	})
}
export const documentsSharedTo = async (db, user) => {
	const documents = await doc.findDocuments(db, { shared: user });
	return documents.map(async x => {
		const location = await getURL(x.name);
		return {
			...x,
			location
		}
	})
}
export const createNewDocument = async (db, user, { name }) => {
	const document =  await doc.saveDocument(db, user, name);
	const location = await getURL(name);
	return {
		...document,
		location
	}
}
export const deleteDocumentByID = async (db, user, id) => {
	const result = await doc.deleteDocument(db, user, id);
	if(result) return true
	else return false
}
export const updateDocument = async (db, user, id, { name }) => {
	const document = await doc.renameDocument(db, user, id, name);
	const location = await getURL(name);
	return {
		...document,
		location
	}
}
export const shareDocumentWith = async (db, user, id, to) => {
	const document = await doc.shareDocument(db, user, id, to);
	const location = await getURL(document.name);
	return {
		...document,
		location
	}
}