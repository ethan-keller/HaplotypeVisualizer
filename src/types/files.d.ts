interface File {
  readonly description: string;
  readonly status: UploadStatus;
  readonly required: boolean;
  readonly file_extensions: string[];
  readonly name?: string;
}

enum UploadStatus {
  NO_UPLOAD = 0,
  SUCCESSFUL_UPLOAD = 1,
  WARNING_UPLOAD = 2,
}
