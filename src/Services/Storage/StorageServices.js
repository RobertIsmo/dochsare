import { generateGetURL, generatePutURL } from "../../Access/minio.js";

export const getURL = async (name) => {
	try {
		const url = await generateGetURL(name);
		return url;
	} catch(e) {
		return false
	}
}
export const putURL = async (name) => {
	try {
		const url = await generatePutURL(name);
		return url;
	} catch(e) {
		return false
	}
}