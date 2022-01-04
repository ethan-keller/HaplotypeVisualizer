import ErrorHandling from './ErrorHandling';
import * as endpoints from '../endpoints_config/GfaEndpoints';
import { GfaLink, GfaPath, GfaSegment } from '../models/gfa';

class GfaCommunication {
  public static async getSegments(): Promise<GfaSegment[]> {
    const response: Response = await fetch(endpoints.getSegments);

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async getLinks(): Promise<GfaLink[]> {
    const response: Response = await fetch(endpoints.getLinks);

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  public static async getPaths(): Promise<GfaPath[]> {
    const response: Response = await fetch(endpoints.getPaths);

    if (ErrorHandling.successfulResponse(response.status)) {
      return await response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}

export default GfaCommunication;