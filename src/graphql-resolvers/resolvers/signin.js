import { signIn } from "../../Services/Auth/Authenticate.js";

const signin = async (_, { fields }, context) => {
	const tokens = await signIn(context.db, fields)
	if(tokens) {
		context.response.cookie('AuthorizationToken', tokens.access, { httpOnly: true });
		context.response.cookie('RefreshToken', tokens.refresh, { httpOnly: true });
		context.response.cookie('UserIdentity', tokens.subject, { httpOnly: true });
		context.response.status(200);
		return true;
	}
	else {
		context.response.status(400);
		return false;
	}
}
export default signin