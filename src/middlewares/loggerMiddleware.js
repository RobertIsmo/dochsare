const middleware = (req, res, next) => {
	console.log(req);
	next();
}
export default middleware