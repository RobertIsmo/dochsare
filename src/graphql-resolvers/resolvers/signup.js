import { signUp } from "../../Services/Auth/Authenticate.js";

const signup = async (_, { fields }, context) => {
	const result = await signUp(context.db, fields);
	context.response.status(result ? 200 : 400);
	return result;
}
export default signup