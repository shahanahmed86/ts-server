import { FileArray, UploadedFile } from 'express-fileupload';

export interface IFileArray extends FileArray {
	uploadedFiles: UploadedFile | UploadedFile[];
}
