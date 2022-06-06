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

export enum FileIndex {
  GFA = 0,
  PHENO = 1,
  // GFF = *,
  BOOKMARKS = 2,
}

interface CoreApiParams {
  id: number;
}

interface GetFileParams extends CoreApiParams {}

interface UpdateFileParams extends CoreApiParams {
  name: string;
}

interface ClearFileParams extends CoreApiParams {}

interface UpdateFolderParams {
  new_folder: string;
}

interface ClearFolderParams {
  folder: string;
}

export type {
  File,
  GetFileParams,
  UpdateFileParams,
  ClearFileParams,
  UpdateFolderParams,
  ClearFolderParams,
};
