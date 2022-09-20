import { verifyUser } from "../Services/Auth/Authenticate.js"

const middleware = (req, res, next) => {
	const AuthorizationToken = req.cookies["AuthorizationToken"]
	const RefreshToken = req.cookies["RefreshToken"]
	const UserIdentity = req.cookies["UserIdentity"]

	const token = verifyUser(UserIdentity, AuthorizationToken, RefreshToken);
	if(token) {
		res.cookie('AuthorizationToken', token, { httpOnly: true });
		req.UserIdentity = UserIdentity;
		return next();
	}
	next();
}

export default middleware;