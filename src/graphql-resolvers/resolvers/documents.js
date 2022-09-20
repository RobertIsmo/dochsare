import { documentsOwnedBy, documentsSharedTo, createNewDocument, deleteDocumentByID, updateDocument, shareDocumentWith } from "../../Services/Document/Document.js";

export const myDocuments = async (_, __, context) => {
	if(!context.UserIdentity) {
		context.response.status(401)
		return [];
	}
	else{
		const documents = await documentsOwnedBy(context.db, context.UserIdentity).catch(_=>{
			context.response.status(401)
			return []
		});
		context.response.status(200);
		return documents;
	}
}
export const sharedDocuments = async (_, __, context) => {
	if(!context.UserIdentity) {
		context.response.status(401)
		return [];
	}
	else{
		const documents = await documentsSharedTo(context.db, context.UserIdentity).catch(_=>{
			context.response.status(401)
			return []
		});
		context.response.status(200);
		return documents;
	}
}
export const createDocument = async (_, { fields }, context) => {
	const document =  await createNewDocument(context.db,fields).catch(_=>{
		context.response.status(401)
		return {};
	});
	context.response.status(200);
	return document;
}
export const deleteDocument = async (_, { id }, context) => {
	const result = await deleteDocumentByID(context.db, context.UserIdentity, id);
	context.response.status(result ? 200 : 400);
	return result;
}
export const changeDocument = async (_, { id, fields }, context) => {
	const document = await updateDocument(context.db, context.UserIdentity, id, fields).catch(_=>{
		context.response.status(401)
		return {};
	});
	context.response.status(200);
	return document;
}
export const shareDocument = async (_, { id, to }, context) => {
	const document = await shareDocumentWith(context.db, context.UserIdentity, id, to).catch(_=>{
		context.response.status(401)
		return {};
	});
	context.response.status(200);
	return document;
}