import { red } from 'kolorist';

export interface ProjectAnswers {
	projectName: string;
	projectType: 'fullstack' | 'frontend' | 'backend';
	frontendFramework?: 'vue' | 'astro' | 'react';
	backendFramework?: 'koa' | 'go';
	addons: string[];
	gitInit: boolean;
	packageManager: string;
}

export function handleCancel(error: unknown): never {
	if (error instanceof Error && error.message.includes('cancelled')) {
		console.log(red('✖') + ' Operation cancelled');
		process.exit(0);
	}
	throw error;
}

export function detectPackageManager(): string {
	const userAgent = process.env.npm_config_user_agent || '';
	if (userAgent.includes('pnpm')) return 'pnpm';
	if (userAgent.includes('bun')) return 'bun';
	if (userAgent.includes('yarn')) return 'yarn';
	return 'npm';
}

export function getInstallCommand(pm: string): string {
	return pm === 'npm' ? 'npm install' : `${pm} install`;
}

export function getDevCommand(pm: string): string {
	return pm === 'npm' ? 'npm run dev' : `${pm} run dev`;
}
