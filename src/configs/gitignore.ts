interface GitignoreOptions {
	hasGo?: boolean;
	hasAstro?: boolean;
}

export function generateGitignore(options: GitignoreOptions): string {
	const lines = [
		'node_modules/',
		'dist/',
		'.env',
		'.env.local',
		'*.log',
		'.DS_Store',
	];

	if (options.hasGo) {
		lines.push('bin/', '*.exe', 'coverage.out');
	}

	if (options.hasAstro) {
		lines.push('.astro/');
	}

	return lines.join('\n') + '\n';
}
