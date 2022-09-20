/* * For a detailed explanation regarding each configuration property, visit: * https: */export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	//moduleDirectories: ["node_modules", "src", "lib"],
	transform: { "\\.[t]sx?$": "ts-jest", },
	transformIgnorePatterns: [],
};