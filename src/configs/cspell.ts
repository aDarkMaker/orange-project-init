export function generateCspellConfig(): string {
	return JSON.stringify(
		{
			words: [],
			ignorePaths: ['node_modules', 'dist', '*.log'],
		},
		null,
		'\t'
	);
}
