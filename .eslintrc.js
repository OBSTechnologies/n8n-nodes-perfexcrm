module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	plugins: ['n8n-nodes-base', '@typescript-eslint'],
	extends: ['plugin:n8n-nodes-base/nodes'],
	rules: {
		'n8n-nodes-base/node-dirname-against-convention': 'off',
		'n8n-nodes-base/node-filename-against-convention': 'off',
		'n8n-nodes-base/node-class-description-credentials-name-unsuffixed': 'off',
		'n8n-nodes-base/node-class-description-icon-not-svg': 'off',
		'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
		'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
		'n8n-nodes-base/node-param-multi-options-type-unsorted-items': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
	ignorePatterns: ['.eslintrc.js', 'dist/**/*', 'node_modules/**/*'],
};