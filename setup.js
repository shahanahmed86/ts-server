#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const {
	existsSync,
	rmSync,
	mkdirSync,
	appendFileSync,
	createWriteStream,
	readFileSync,
} = require('fs');
const cp = require('child_process');

shouldInstallModules();

const inquirer = require('inquirer');
const arg = require('arg');

const rawArgs = arg(
	{
		'--yes': Boolean,
		'-Y': '--yes',
		'--force-reinstall': Boolean,
		'-F': '--force-reinstall',
	},
	{
		argv: process.argv.slice(2),
	},
);

/**
 * @typedef {import('./src/@types/common.type').SetupOptions} SetupOptions
 */

/** @type {SetupOptions} */
let options = {
	forceReInstall: rawArgs['--force-reinstall'] || false,
	skipPrompts: rawArgs['--yes'] || false,
	args: rawArgs._[0],
};

/** @type {import('inquirer').QuestionCollection} */
const questions = [
	{
		type: 'input',
		name: 'APP_PORT',
		message: 'Please enter the port for the app',
		default: '7000',
	},
	{
		type: 'input',
		name: 'APP_PROTOCOL',
		message: 'Please enter the protocol for the app',
		default: 'http:',
	},
	{
		type: 'input',
		name: 'APP_HOST',
		message: 'Please enter the host for the app',
		default: 'localhost:7000',
	},
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
		name: 'JWT_ACCESS',
		message: 'Please enter the secret for JWT access token',
		default: 'jwt-access-secret',
	},
	{
		type: 'number',
		name: 'JWT_ACCESS_LIFE',
		message: 'Please enter the milliseconds to expire the JWT access token',
		default: '300000',
	},
	{
		type: 'password',
		name: 'JWT_REFRESH',
		message: 'Please enter the secret for JWT refresh token',
		default: 'jwt-refresh-secret',
	},
	{
		type: 'number',
		name: 'JWT_REFRESH_LIFE',
		message: 'Please enter the milliseconds to expire the JWT refresh token',
		default: '86400000',
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
		type: 'password',
		name: 'SESSION_SECRET',
		message: 'Please enter the session secret',
		default: 'redis-secret',
	},
];

(async () => {
	try {
		options = await promptForMissingOptions(options);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { forceReInstall, skipPrompts, args, ...envs } = options;

		if (forceReInstall) {
			if (existsSync('node_modules')) rmSync('node_modules', { recursive: true });
			if (existsSync('.husky/_')) rmSync('.husky/_', { recursive: true });
			if (existsSync('secrets')) rmSync('secrets', { recursive: true });
			if (existsSync('.env')) rmSync('.env');

			shouldInstallModules();
		}

		if (!existsSync('secrets')) mkdirSync('secrets');

		const dotEnv = createWriteStream('.env', { flags: 'a' });

		const keys = Object.keys(envs);

		for (const key of keys) {
			const filename = `secrets/${key}`;
			const value = envs[key];

			if (!existsSync(filename)) appendFileSync(filename, value);

			const lineValue = `${key}=${value}`;
			if (existsSync('.env')) {
				const savedDotEnvs = readFileSync('.env', 'utf-8');
				if (savedDotEnvs.includes(lineValue)) continue;
			}

			await insertContent(dotEnv, `${lineValue}\n`);
		}

		coloredLogs('Setup Finished', undefined, true);

		if (!dotEnv.closed) {
			await new Promise((resolve, reject) => {
				dotEnv.close((err) => {
					if (err) reject(err);

					resolve(true);
				});
			});
		}
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
 * @param {SetupOptions} opts
 * @returns {Promise<SetupOptions>} Promise<Options>
 */
async function promptForMissingOptions(opts) {
	if (opts.skipPrompts) {
		const ind = questions.findIndex((question) => typeof question.default === 'undefined');
		if (ind !== -1) {
			const ans = await inquirer.prompt(questions[ind]);
			questions[ind].default = ans[questions[ind].name];
		}

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
 * It will install node packages with npm install command
 * @returns {void} void
 */
function shouldInstallModules() {
	executeCommand('npm install');
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
