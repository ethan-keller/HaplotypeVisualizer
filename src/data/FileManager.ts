import events from 'events';



var EventEmitter = events.EventEmitter;
var emitter = new EventEmitter();


function validateFileExtension(fileName: string, acceptedFileExtensions: string[]) {
  return acceptedFileExtensions.includes(fileName.substring(fileName.lastIndexOf('.')));
}

function subscribe(callback: () => void): void {
  emitter.addListener('update', callback);
}

function unsubscribe(callback: () => void): void {
  emitter.removeListener('update', callback);
}

function uploadFile(fileIndex: number, name: string, path: string): void {
  // let file: UploadFile = requestedFiles[fileIndex];
  // file.fileName = name;
  // if (validateFileExtension(name, requestedFiles[fileIndex].fileExtensions)) {
  //   file.status = UploadStatus.SUCCESSFUL_UPLOAD;
  // } else {
  //   file.status = UploadStatus.WARNING_UPLOAD;
  // }
  emitter.emit('update');
}

function removeFile(fileIndex: number): void {
  // let file: UploadFile = requestedFiles[fileIndex];
  // file.fileName = undefined;
  // file.status = UploadStatus.NO_UPLOAD;
  emitter.emit('update');
}

function allRequiredFilesUploaded(): boolean {
  // for (const file of requestedFiles) {
  //   if (file.required && file.status !== UploadStatus.SUCCESSFUL_UPLOAD) return false;
  // }
  return true;
}

const FileManager = {
  subscribe,
  unsubscribe,
  uploadFile,
  removeFile,
  allRequiredFilesUploaded,
};

export default FileManager;
