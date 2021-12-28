import { UploadFile } from '../models/file';
import * as endpoints from '../endpoints_config/files_endpoints';
import ErrorHandling from './ErrorHandling';

class FileCommunication {
  public static async getAllFiles(): Promise<UploadFile[]> {
    const response: Response = await fetch(endpoints.getAllFiles);

    if (ErrorHandling.successfulResponse(response.status)) {
      const files: UploadFile[] = await response.json();
      return files;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async getFile(index: number): Promise<UploadFile> {
    const response: Response = await fetch(endpoints.getFile);

    if (ErrorHandling.successfulResponse(response.status)) {
      const file: UploadFile = await response.json();
      return file;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async updateFilePath(): Promise<string> {
    const response: Response = await fetch(endpoints.updateFilePath);

    if (ErrorHandling.successfulResponse(response.status)) {
      const res: string = await response.json();
      return res;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}

export default FileCommunication;
