if(process.env.NODE_ENV === "production") {
	module.exports = process.env;
} else {
	const environment = require("dotenv");
	environment.config();
	module.exports = process.env;
}