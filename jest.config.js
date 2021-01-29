module.exports = {
	moduleNameMapper: {
		"\\.(css|sass)$": "identity-obj-proxy"
	},
	testEnvironment: "node",
	preset: "@shelf/jest-mongodb",
	snapshotSerializers: ["enzyme-to-json/serializer"],
	setupFiles: ["./setupJest.js"]
};
