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
    const params = { index: index };

    const response: Response = await fetch(endpoints.getFile, {
      body: JSON.stringify(params),
    });

    if (ErrorHandling.successfulResponse(response.status)) {
      const file: UploadFile = await response.json();
      return file;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async updateFile(name: string, path: string): Promise<string> {
    const params = {
      name: name,
      path: path,
    };
    const response: Response = await fetch(endpoints.updateFile, {
      body: JSON.stringify(params),
    });

    if (ErrorHandling.successfulResponse(response.status)) {
      const res: string = await response.json();
      return res;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async removeFile(index: number): Promise<string> {
    const params = {
      index: index,
    };
    const response: Response = await fetch(endpoints.removeFile, {
      body: JSON.stringify(params),
    });

    if (ErrorHandling.successfulResponse(response.status)) {
      const res: string = await response.json();
      return res;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async areAllRequiredUploaded(): Promise<boolean> {
    const response: Response = await fetch(endpoints.areAllRequiredUploaded);

    if (ErrorHandling.successfulResponse(response.status)) {
      const res: boolean = await response.json();
      return res;
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}

export default FileCommunication;
