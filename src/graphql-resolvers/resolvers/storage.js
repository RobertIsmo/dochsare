import { getURL, putURL } from "../../Services/Storage/StorageServices.js"

export const get = async (_, { name }, context) => {
	const url = await getURL(name);
	if(url) {
		context.response.status(200);
		return url;
	} else {
		context.response.status(400);
		return undefined
	}
}
export const put = async (_, { name }, context) => {
	const url = await putURL(name);
	if(url) {
		context.response.status(200);
		return url;
	} else {
		context.response.status(400);
		return undefined
	}
}