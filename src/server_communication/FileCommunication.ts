import { UploadFile } from '../models/file';
import * as endpoints from '../endpoints_config/files_endpoints';
import ErrorHandling from './ErrorHandling';

class FileCommunication {
  public static async getAllFiles(): Promise<UploadFile[]> {
    const response: Response = await fetch(endpoints.getAllFiles);

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async getFile(index: number): Promise<UploadFile> {
    const params = { index: index.toString() };

    const response: Response = await fetch(endpoints.getFile + '?' + new URLSearchParams(params));

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async updateFile(index: number, name: string): Promise<string> {
    const params = {
      name: name,
      index: index.toString(),
    };

    const response: Response = await fetch(
      endpoints.updateFile + '?' + new URLSearchParams(params),
      { method: 'PUT' },
    );

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async removeFile(index: number): Promise<string> {
    const params = {
      index: index.toString(),
    };
    const response: Response = await fetch(
      endpoints.removeFile + '?' + new URLSearchParams(params),
      { method: 'DELETE' },
    );

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async areAllRequiredUploaded(): Promise<boolean> {
    const response: Response = await fetch(endpoints.areAllRequiredUploaded);

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}

export default FileCommunication;
