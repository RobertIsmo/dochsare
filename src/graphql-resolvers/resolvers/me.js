import { UserByID } from "../../Services/Auth/Authenticate.js"

const me = async (_, __, context) => {
	if(!context.UserIdentity) {
		context.response.status(401)
		return undefined;
	}
	else{
		const user = await UserByID(context.db, context.UserIdentity).catch(_=>{
			context.response.status(401)
			return undefined
		});
		context.response.status(200);
		return user;
	}
}
export default me