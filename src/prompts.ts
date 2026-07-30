import * as p from '@clack/prompts';
import type { ProjectAnswers } from './utils';

export async function runPrompts(defaultName?: string): Promise<ProjectAnswers> {
	p.intro('🍊 orange-project-init');

	const projectName = await p.text({
		message: 'Project name:',
		placeholder: defaultName || 'my-app',
		defaultValue: defaultName || 'my-app',
		validate: (value) => {
			if (!value) return 'Project name is required';
			if (!/^[a-z0-9-_]+$/.test(value)) return 'Only lowercase letters, numbers, hyphens and underscores';
		},
	});

	if (p.isCancel(projectName)) {
		p.cancel('Operation cancelled');
		process.exit(0);
	}

	const projectType = await p.select({
		message: 'Project type:',
		options: [
			{ value: 'fullstack', label: 'Full-stack (separated frontend & backend)' },
			{ value: 'frontend', label: 'Frontend only' },
			{ value: 'backend', label: 'Backend only' },
		],
	});

	if (p.isCancel(projectType)) {
		p.cancel('Operation cancelled');
		process.exit(0);
	}

	let frontendFramework: ProjectAnswers['frontendFramework'];
	let backendFramework: ProjectAnswers['backendFramework'];

	if (projectType === 'fullstack' || projectType === 'frontend') {
		const framework = await p.select({
			message: 'Frontend framework: (TypeScript by default)',
			options: [
				{ value: 'vue', label: 'Vue' },
				{ value: 'astro', label: 'Astro' },
				{ value: 'react', label: 'React' },
			],
		});

		if (p.isCancel(framework)) {
			p.cancel('Operation cancelled');
			process.exit(0);
		}

		frontendFramework = framework as ProjectAnswers['frontendFramework'];
	}

	if (projectType === 'fullstack' || projectType === 'backend') {
		const framework = await p.select({
			message: 'Backend framework:',
			options: [
				{ value: 'koa', label: 'Koa (Node + TS)' },
				{ value: 'go', label: 'Go' },
			],
		});

		if (p.isCancel(framework)) {
			p.cancel('Operation cancelled');
			process.exit(0);
		}

		backendFramework = framework as ProjectAnswers['backendFramework'];
	}

	const addons = await p.multiselect({
		message: 'Add-ons: (space to toggle, enter to confirm)',
		options: [
			{ value: 'eslint', label: 'ESLint' },
			{ value: 'prettier', label: 'Prettier' },
			{ value: 'cspell', label: 'cspell' },
		],
		required: false,
	});

	if (p.isCancel(addons)) {
		p.cancel('Operation cancelled');
		process.exit(0);
	}

	const gitInit = await p.confirm({
		message: 'Initialize git repository?',
		initialValue: true,
	});

	if (p.isCancel(gitInit)) {
		p.cancel('Operation cancelled');
		process.exit(0);
	}

	return {
		projectName: projectName as string,
		projectType: projectType as ProjectAnswers['projectType'],
		frontendFramework,
		backendFramework,
		addons: addons as string[],
		gitInit: gitInit as boolean,
	};
}
