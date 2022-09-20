import { deleteAccount } from "../../Services/Auth/Authenticate.js";

const deleteUser = async (_, __, context) => {
		if(!context.UserIdentity) {
		context.response.status(401)
		return false;
	}
	else{
		const result = await deleteAccount(context.db, context.UserIdentity).catch(_=>{
			context.response.status(401)
			return false;
		});
		context.response.status(200);
		return true;
	}
}
export default deleteUser