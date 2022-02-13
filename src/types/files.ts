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
  SUCCESSFUL = 1,
  WARNING = 2,
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
