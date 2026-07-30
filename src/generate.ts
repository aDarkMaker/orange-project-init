import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as p from '@clack/prompts';
import degit from 'degit';
import { green } from 'kolorist';
import type { ProjectAnswers } from './utils';
import { detectPackageManager, getDevCommand, getInstallCommand } from './utils';
import { generatePrettierConfig } from './configs/prettier';
import { generateCspellConfig } from './configs/cspell';
import { generateESLintConfig, getESLintDependencies } from './configs/eslint';
import { generateGitignore } from './configs/gitignore';

const TEMPLATE_REPOS: Record<string, string> = {
	vue: 'aDarkMaker/template-vue',
	react: 'aDarkMaker/template-react',
	astro: 'aDarkMaker/template-astro',
	koa: 'aDarkMaker/template-koa',
	go: 'aDarkMaker/template-go',
};

export async function generate(answers: ProjectAnswers): Promise<void> {
	const { projectName, projectType, frontendFramework, backendFramework, addons, gitInit } = answers;
	const targetDir = join(process.cwd(), projectName);

	if (existsSync(targetDir)) {
		p.cancel(`Directory ${projectName} already exists`);
		process.exit(1);
	}

	mkdirSync(targetDir, { recursive: true });

	const s = p.spinner();

	// Frontend
	if (frontendFramework) {
		s.start(`Downloading ${frontendFramework} template...`);
		const frontendDir = projectType === 'fullstack' ? join(targetDir, 'frontend') : targetDir;
		await downloadTemplate(frontendFramework, frontendDir);
		updatePackageName(join(frontendDir, 'package.json'), projectName);
		s.stop(`${frontendFramework} template downloaded`);
	}

	// Backend
	if (backendFramework) {
		s.start(`Downloading ${backendFramework} template...`);
		const backendDir = projectType === 'fullstack' ? join(targetDir, 'server') : targetDir;
		await downloadTemplate(backendFramework, backendDir);
		if (backendFramework !== 'go') {
			updatePackageName(join(backendDir, 'package.json'), projectName);
		}
		s.stop(`${backendFramework} template downloaded`);
	}

	// Add-ons
	if (addons.includes('prettier')) {
		writeFileSync(join(targetDir, '.prettierrc.cjs'), generatePrettierConfig());
	}

	if (addons.includes('cspell')) {
		writeFileSync(join(targetDir, 'cspell.json'), generateCspellConfig());
	}

	if (addons.includes('eslint')) {
		writeFileSync(
			join(targetDir, 'eslint.config.js'),
			generateESLintConfig({
				framework: frontendFramework,
				isBackend: projectType === 'backend',
			})
		);

		// Inject ESLint deps into package.json
		const pkgPath = projectType === 'fullstack'
			? join(targetDir, 'frontend', 'package.json')
			: join(targetDir, 'package.json');

		if (existsSync(pkgPath)) {
			const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
			pkg.devDependencies = {
				...pkg.devDependencies,
				...getESLintDependencies(frontendFramework, projectType === 'backend'),
			};
			writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
		}
	}

	// Gitignore
	writeFileSync(
		join(targetDir, '.gitignore'),
		generateGitignore({
			hasGo: backendFramework === 'go',
			hasAstro: frontendFramework === 'astro',
		})
	);

	// Git init
	if (gitInit) {
		s.start('Initializing git repository...');
		execSync('git init', { cwd: targetDir, stdio: 'ignore' });
		execSync('git add -A', { cwd: targetDir, stdio: 'ignore' });
		execSync('git commit -m "chore: initial commit from orange-project-init"', {
			cwd: targetDir,
			stdio: 'ignore',
		});
		s.stop('Git repository initialized');
	}

	// Done
	const pm = detectPackageManager();
	const installCmd = getInstallCommand(pm);
	const devCmd = getDevCommand(pm);

	p.outro(`✨ Project ${green(projectName)} created successfully!

Next steps:
  cd ${projectName}
  ${installCmd}
  ${devCmd}`);
}

async function downloadTemplate(template: string, targetDir: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const emitter = degit(`${TEMPLATE_REPOS[template]}#main`, {
			cache: false,
			force: true,
			verbose: false,
		});

		emitter.on('error', reject);
		emitter.on('warn', (err) => {
			console.warn('Warning:', err.message);
		});

		emitter.clone(targetDir).then(() => resolve()).catch(reject);
	});
}

function updatePackageName(pkgPath: string, projectName: string): void {
	if (!existsSync(pkgPath)) return;
	const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
	pkg.name = projectName;
	writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
}
