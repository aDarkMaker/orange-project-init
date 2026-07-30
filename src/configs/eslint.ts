interface ESLintOptions {
	framework?: 'vue' | 'astro' | 'react';
	isBackend?: boolean;
}

export function generateESLintConfig(options: ESLintOptions): string {
	const { framework, isBackend } = options;

	if (isBackend) {
		return `import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		},
	}
);
`;
	}

	switch (framework) {
		case 'vue':
			return `import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	{
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	}
);
`;

		case 'astro':
			return `import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs.recommended
);
`;

		case 'react':
			return `import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from '@eslint-react/eslint-plugin';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	react.configs.recommended
);
`;

		default:
			return `import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended
);
`;
	}
}

export function getESLintDependencies(framework?: string, isBackend?: boolean): Record<string, string> {
	const deps: Record<string, string> = {
		'@eslint/js': 'latest',
		'typescript-eslint': 'latest',
		eslint: 'latest',
	};

	if (isBackend) return deps;

	switch (framework) {
		case 'vue':
			deps['eslint-plugin-vue'] = 'latest';
			break;
		case 'astro':
			deps['eslint-plugin-astro'] = 'latest';
			break;
		case 'react':
			deps['@eslint-react/eslint-plugin'] = 'latest';
			break;
	}

	return deps;
}
