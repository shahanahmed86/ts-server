import fs from 'fs';
import cron from 'node-cron';
import { JOBS } from '../config';
import { TEMP_FOLDER_PATH } from '../utils/constants.util';

function scheduledJobs(): void {
	cron.schedule(JOBS.removeTemp, removeTempFolder);
}

function removeTempFolder() {
	console.log(`removing temp folder at ${new Date().toISOString()}`);

	const isTempExists = fs.existsSync(TEMP_FOLDER_PATH);
	if (!isTempExists) return;

	fs.rmSync(TEMP_FOLDER_PATH, { recursive: true });
}

export default scheduledJobs;
