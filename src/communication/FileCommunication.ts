import { UploadFile } from '../models/files';
import * as endpoints from '../endpoints_config/files_endpoints';
import ErrorHandling from './ErrorHandling';

class FileCommunication {
  public static async getFiles(): Promise<UploadFile[]> {
    const response: Response = await fetch(endpoints.getFiles);

    if (ErrorHandling.successfulResponse(response.status)) {
      const files: UploadFile[] = await response.json();
      return files;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}

export default FileCommunication;
