export interface UploadFile {
  readonly description: string;
  readonly status: UploadStatus;
  readonly required: boolean;
  readonly file_extensions: string[];
  readonly name?: string;
  readonly path?: string;
}

export enum UploadStatus {
  NO_UPLOAD = 0,
  SUCCESSFUL_UPLOAD = 1,
  WARNING_UPLOAD = 2,
}
