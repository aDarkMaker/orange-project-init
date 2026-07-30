import { cac } from 'cac';
import { runPrompts } from './prompts';
import { generate } from './generate';
import { handleCancel } from './utils';

const cli = cac('orange-project-init');

cli.command('[project-name]', 'Create a new project').action(async (projectName?: string) => {
	try {
		const answers = await runPrompts(projectName);
		await generate(answers);
	} catch (error) {
		handleCancel(error);
	}
});

cli.help();
cli.parse();
