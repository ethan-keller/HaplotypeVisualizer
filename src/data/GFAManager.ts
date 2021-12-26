import GFA from '../gfa/GFA';
import GFAParser from '../gfa/GFAParser';
import FileManager, { FileExtensions, UploadFile } from './FileManager';

var gfa: GFA;

function getGFA(): GFA {
  return gfa;
}

function prepareGFA(): void {
  const gfaFile: UploadFile = getGfaFileFromFileManager();
  if (!validateGfaFile(gfaFile)) return;

  let parser: GFAParser = new GFAParser(gfaFile.fileName);

  // TODO: do this somewhere safe
  gfa = parser.parse();
}

function validateGfaFile(file: UploadFile): boolean {
  return file.fileExtensions.includes(FileExtensions.GFA);
}

function isGfaEmpty(): boolean {
  return gfa === undefined;
}

function getGfaFileFromFileManager(): UploadFile {
  return FileManager.getRequestedFiles().filter((file) => file.fileExtensions.includes(FileExtensions.GFA))[0];
}

const GFAManager = {
  prepareGFA,
};

export default GFAManager;
