const { join } = require("node:path");
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

module.exports = (async () => {
	const Maybe = (await import("../../lib/maybe.js")).default;
	const types = Maybe(loadFilesSync(join(__dirname, './')))

	return types.map(x => mergeTypeDefs(x), "merge type definitions")
})()


