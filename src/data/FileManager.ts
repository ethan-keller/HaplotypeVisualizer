import events from 'events';

export interface UploadFile {
  fileDescription: string;
  status: UploadStatus;
  required: boolean;
  fileExtensions: string[];
  fileName?: string;
  filePath?: string;
}

export enum UploadStatus {
  NO_UPLOAD = 'No file uploaded',
  SUCCESSFUL_UPLOAD = 'Successfully uploaded',
  WARNING_UPLOAD = 'Unsuccessfully uploaded',
}

var EventEmitter = events.EventEmitter;
var emitter = new EventEmitter();
var requestedFiles: UploadFile[] = [
  {
    fileDescription: 'GFA file',
    status: UploadStatus.NO_UPLOAD,
    required: true,
    fileExtensions: ['.gfa'],
  },
  {
    fileDescription: 'Phenotype table',
    status: UploadStatus.NO_UPLOAD,
    required: false,
    fileExtensions: ['.csv'],
  },
  {
    fileDescription: 'GFF file',
    status: UploadStatus.NO_UPLOAD,
    required: false,
    fileExtensions: ['.gff'],
  },
];

function validateFileExtension(fileName: string, acceptedFileExtensions: string[]) {
  return acceptedFileExtensions.includes(fileName.substring(fileName.lastIndexOf('.')));
}

function getRequestedFiles(): UploadFile[] {
  return requestedFiles.concat();
}

function subscribe(callback: () => void): void {
  emitter.addListener('update', callback);
}

function unsubscribe(callback: () => void): void {
  emitter.removeListener('update', callback);
}

function uploadFile(fileIndex: number, name: string, path: string): void {
  let file: UploadFile = requestedFiles[fileIndex];
  file.fileName = name;
  file.filePath = path;
  if (validateFileExtension(name, requestedFiles[fileIndex].fileExtensions)) {
    file.status = UploadStatus.SUCCESSFUL_UPLOAD;
  } else {
    file.status = UploadStatus.WARNING_UPLOAD;
  }
  emitter.emit('update');
}

function removeFile(fileIndex: number): void {
  let file: UploadFile = requestedFiles[fileIndex];
  file.fileName = undefined;
  file.filePath = undefined;
  file.status = UploadStatus.NO_UPLOAD;
  emitter.emit('update');
}

function allRequiredFilesUploaded(): boolean {
  for (const file of requestedFiles) {
    if (file.required && file.status !== UploadStatus.SUCCESSFUL_UPLOAD) return false;
  }
  return true;
}

const FileManager = {
  getRequestedFiles,
  subscribe,
  unsubscribe,
  uploadFile,
  removeFile,
  allRequiredFilesUploaded,
};

export default FileManager;
