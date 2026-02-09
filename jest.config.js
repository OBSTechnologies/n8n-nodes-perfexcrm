module.exports = {
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: {
				types: ['jest', 'node'],
			},
		}],
	},
};
