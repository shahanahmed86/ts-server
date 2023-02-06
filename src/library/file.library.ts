import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import { IFileArray } from '../@types/library.type';
import { IN_PROD } from '../config';
import { convertUnknownIntoError, NotFound } from '../utils/errors.util';
import { getUniqueId } from '../utils/logics.util';

class File {
	path = './uploads';

	get uuid(): string {
		return getUniqueId();
	}

	async upload(imageFile: UploadedFile): Promise<string> {
		try {
			const filename = `${this.uuid}-${imageFile.name}`;

			if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
			if (!fs.existsSync(`${this.path}/temp`)) fs.mkdirSync(`${this.path}/temp`);

			const uploadFile = path.join(this.path, 'temp', filename);
			await imageFile.mv(uploadFile);

			return `temp/${filename}`;
		} catch (e) {
			const error = convertUnknownIntoError(e);
			throw error;
		}
	}

	async localUpload(image: IFileArray): Promise<string | string[]> {
		const imageFiles = image.uploadedFiles;
		if (!Array.isArray(imageFiles)) return this.upload(imageFiles);

		return Promise.all(imageFiles.map(this.upload));
	}

	deleteOldFileLocally(imagePath: string): boolean {
		const path = `${this.path}/${imagePath}`;
		if (!fs.existsSync(path)) return false;

		fs.unlinkSync(path);
		return true;
	}

	getFilePath(imagePath: string): string {
		const path = `${this.path}/${imagePath}`;
		if (fs.existsSync(path)) return path;

		return `./${IN_PROD ? 'dist' : 'src'}/assets/404-image.png`;
	}

	moveImageFromTmp(imagePath: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const currentPath = path.join(this.path, imagePath);
			if (!fs.existsSync(currentPath)) reject(new NotFound('Image not found'));
			else {
				const newFile = imagePath.split('/')[1];
				const destPath = path.join(this.path, newFile);

				fs.rename(currentPath, destPath, (e) => {
					if (!e) resolve(newFile);

					const error = convertUnknownIntoError(e);
					reject(error);
				});
			}
		});
	}
}

const file = new File();

export default file;
