/* eslint-disable @typescript-eslint/no-var-requires */
const {
	existsSync,
	rmSync,
	createWriteStream,
	readFileSync,
	mkdirSync,
	appendFileSync,
} = require('fs');
const cp = require('child_process');

shouldInstallModules();

const inquirer = require('inquirer');
const arg = require('arg');

const rawArgs = arg(
	{ '--yes': Boolean, '-Y': '--yes', '--force-reinstall': Boolean, '-F': '--force-reinstall' },
	{ argv: process.argv.slice(2) },
);

/** @type {import('./src/@types/common.type').SetupOptions} */
let options = {
	forceReInstall: rawArgs['--force-reinstall'] || false,
	skipPrompts: rawArgs['--yes'] || false,
	args: rawArgs._[0],
};

/** @type {import('inquirer').QuestionCollection} */
const questions = [
	{
		type: 'input',
		name: 'BCRYPT_SALT',
		message: 'Please enter the salt value to encrypt password/values with',
		default: '10',
	},
	{
		type: 'input',
		name: 'BCRYPT_MAX_BYTES',
		message: 'Please enter the salt value for maximum encryption bytes for password/values with',
		default: '72',
	},
	{
		type: 'password',
		name: 'JWT_SECRET',
		message: 'Please enter the secret to create a Login token with',
		default: 'billa-mama',
	},
	{
		type: 'number',
		name: 'JWT_EXPIRES',
		message: 'Please enter the milliseconds to expire the JWT token',
		default: '3600000',
	},
	{
		type: 'input',
		name: 'DB_HOST',
		message: 'Please enter the host of database',
		default: 'db',
	},
	{
		type: 'input',
		name: 'DB_USER',
		message: "Please enter the username of Database's host",
		default: 'admin',
	},
	{
		type: 'password',
		name: 'DB_PASS',
		message: "Please enter the password of Database's host",
		default: 'lmelg8',
	},
	{
		type: 'input',
		name: 'DB_NAME',
		message: "Please enter the name of Database's host like mydb, test or etc",
		default: 'dev_database',
	},
	{
		type: 'input',
		name: 'DB_PORT',
		message: "Please enter the port where Database's host",
		default: '5432',
	},
	{
		type: 'input',
		name: 'REDIS_HOST',
		message: 'Please enter the host of redis',
		default: 'cache',
	},
	{
		type: 'input',
		name: 'REDIS_PORT',
		message: "Please enter the port where Redis' host",
		default: '6379',
	},
	{
		type: 'password',
		name: 'REDIS_PASSWORD',
		message: "Please enter the password of Redis' host",
		default: 'lmelg8',
	},
	{
		type: 'input',
		name: 'CRON_REMOVE_TEMP',
		message: 'Please enter the interval to delete temp folder of file uploads',
		default: '15 10 * * *',
	},
];

(async () => {
	try {
		options = await promptForMissingOptions(options);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { forceReInstall, skipPrompts, args, ...env } = options;

		if (forceReInstall) {
			if (existsSync('node_modules')) rmSync('node_modules', { recursive: true });
			if (existsSync('.husky/_')) rmSync('.husky/_', { recursive: true });
			if (existsSync('secrets')) rmSync('secrets', { recursive: true });
			if (existsSync('.env')) rmSync('.env');
		}

		shouldInstallModules();

		const isEnvExists = existsSync('.env');

		const envs = createWriteStream('.env', { flags: 'a' });
		if (!isEnvExists) {
			const envExample = readFileSync('.env.example', 'utf8');
			await insertContent(envs, envExample);
		}

		let allVars = getJSON('.env');

		for (const key in env) {
			if (!(key in allVars)) await insertContent(envs, `\n${key}=${env[key]}`);
		}

		allVars = getJSON('.env');
		if (!existsSync('secrets')) mkdirSync('secrets');
		Object.keys(allVars).forEach((k) => {
			if (!existsSync(`secrets/${k}`)) appendFileSync(`secrets/${k}`, allVars[k]);
		});

		coloredLogs('Setup Finished', undefined, true);
		process.exitCode = 0;
	} catch (error) {
		coloredLogs(error.message, true);
		process.exitCode = 1;
	} finally {
		process.exit();
	}
})();

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

/**
 * It will log the result
 * @param {string} message
 * @param {boolean} failed
 * @param {boolean} shouldExit
 * @returns {void} void
 */
function coloredLogs(message, failed = false, shouldExit = false) {
	executeCommand(`echo "\n\\e[1;${failed ? 31 : 32}m ...${message}... \\e[0m"`, shouldExit);
}

/**
 * It will return the asked questions for creating environment variables
 * @param {object} opts
 * @returns {object|Promise<object>} object|Promise<object>
 */
function promptForMissingOptions(opts) {
	if (opts.skipPrompts) {
		return questions.reduce(
			(acc, cur) => Object.assign(opts, acc, { [cur.name]: cur.default }),
			{},
		);
	}

	return inquirer
		.prompt(questions)
		.then((ans) =>
			questions.reduce((acc, cur) => Object.assign(opts, acc, { [cur.name]: ans[cur.name] }), {}),
		);
}

/**
 * It will return a JSON object by converting a file
 * @param {string} filePath
 * @param {string=} separate
 * @returns {object}
 */
function getJSON(filePath, separate = '=') {
	return readFileSync(filePath, 'utf8')
		.split('\n')
		.reduce((acc, cur) => {
			const [key, value] = cur.trim().split(separate);
			if (key.trim()) acc = { ...acc, [key]: value };
			return acc;
		}, {});
}

/**
 * It will install node packages with npm ci command
 * @returns {void} void
 */
function shouldInstallModules() {
	if (!existsSync('node_modules')) executeCommand('npm ci');
}

/**
 * It will insert the text into the file
 * @param {import('fs').WriteStream} envs
 * @param {string} content
 * @returns {Promise<boolean>} boolean
 */
function insertContent(envs, content) {
	return new Promise((resolve, reject) => {
		envs.write(content, (err) => {
			if (err) reject(err.message);

			resolve(true);
		});
	});
}
