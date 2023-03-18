/* eslint-disable @typescript-eslint/no-var-requires */
const cp = require('child_process');

executeCommand('cp -R src/assets dist/assets');

executeCommand('cp -R src/express/views dist/express/views');

/**
 * It will execute the shell command
 * @param {string} cmd
 * @param {boolean} exit
 * @param {string} stdio
 * @returns {string|boolean|void} string|boolean|void
 */
function executeCommand(cmd, exit = false, stdio = 'inherit') {
	const result = cp.spawnSync(cmd, {
		cwd: process.cwd(),
		env: process.env,
		stdio,
		shell: true,
		encoding: 'utf8`',
	});

	if (result.status || exit) process.exit(result.status);
	else {
		if (stdio === 'pipe') return result.stdout.replace('\n', '');
		else return true;
	}
}
