import { existsSync, rmSync } from 'fs';
import cron from 'node-cron';
import configs from '../config';
import { TEMP_FOLDER_PATH } from '../utils/constants.util';

const jobs = configs.cron;

function scheduledJobs(): void {
	cron.schedule(jobs.removeTempAt, removeTempFolder);
}

function removeTempFolder() {
	console.log(`removing temp folder at ${new Date().toISOString()}`);

	const isTempExists = existsSync(TEMP_FOLDER_PATH);
	if (!isTempExists) return;

	rmSync(TEMP_FOLDER_PATH, { recursive: true });
}

export default scheduledJobs;
