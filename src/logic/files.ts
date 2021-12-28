import { UploadFile, UploadStatus } from "../models/file";

export function validateFileExtension(fileName: string, acceptedFileExtensions: string[]): boolean {
  return acceptedFileExtensions.includes(fileName.substring(fileName.lastIndexOf('.')));
}

export function updateUploadStatus(file: UploadFile): void {
	if (!file.name) return;
  if (validateFileExtension(file.name, file.file_extensions)) {
    
  }
}

export function removeFile(fileIndex: number): void {
  // let file: UploadFile = requestedFiles[fileIndex];
  // file.fileName = undefined;
  // file.status = UploadStatus.NO_UPLOAD;
}

export function allRequiredFilesUploaded(): boolean {
  // for (const file of requestedFiles) {
  //   if (file.required && file.status !== UploadStatus.SUCCESSFUL_UPLOAD) return false;
  // }
  return true;
}


