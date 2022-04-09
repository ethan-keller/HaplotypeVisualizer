interface File {
  readonly id: number;
  readonly description: string;
  readonly status: FileStatus;
  readonly required: boolean;
  readonly file_extensions: string[];
  readonly name?: string;
}

export enum FileStatus {
  NO_FILE = 0,
  INVALID = 1,
  NEEDS_PRE_PROCESSING = 2,
  PRE_PROCESSING = 3,
  READY = 4,
}

interface CoreApiParams {
  id: number;
}

interface GetFileParams extends CoreApiParams {}

interface UpdateFileParams extends CoreApiParams {
  name: string;
}

interface ClearFileParams extends CoreApiParams {}

export type { File, GetFileParams, UpdateFileParams, ClearFileParams };
