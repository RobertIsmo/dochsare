import Minio from "minio";
import config from "../config/config.cjs";

const client = new Minio.Client({
	endPoint: config.MINIO_URL,
	port:9000,
	useSSL: false,
	accessKey:"user",
	secretKey:"password",
})

export const init = async () => {
	console.log("Attempting to connect to Minio...");
	await client.makeBucket("documents").catch(({ code } = e) => {
		if(code === "BucketAlreadyOwnedByYou") return
		else throw e;
	});
	console.log("Minio Connected.");
}

export const generatePutURL = async (name) => {
	return await client.presignedPutObject("documents", name, 360);
}
export const generateGetURL = async (name) => {
	return await client.presignedGetObject("documents", name, 360)
}