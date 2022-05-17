import React, { createRef, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { File, FileStatus } from '../../types/files';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';
import filesApi from '../../api/files';
import { useAppDispatch } from '../../store';
import { reset as resetPheno } from '../../slices/pheno';
import { reset as resetLayout } from '../../slices/graphLayout';
import { reset as resetSelection } from '../../slices/graphSelection';
import { useLocation } from 'react-router';

interface FileTableProps {}

const FileTable: React.FC<FileTableProps> = (props) => {
  const { data: files = [], isLoading, isError } = filesApi.useGetAllFilesQuery();
  const [clearFile] = filesApi.useClearFileMutation();
  const [updateFile] = filesApi.useUpdateFileMutation();
  const [preprocess, { isLoading: isPreprocessing }] = filesApi.usePreprocessMutation();
  const [uploadLayout] = filesApi.useUploadLayoutMutation();
  const [uploadBookmarks] = filesApi.useUploadBookmarksMutation();
  const dispatch = useAppDispatch();
  const locationState = useLocation().state as {
    highlightPhenoTableRow?: boolean;
    highlightBookmarksRow?: boolean;
  };

  // create refs for inputs
  const importInputRefs: React.RefObject<HTMLInputElement>[] = useMemo(
    () => (files ? files.map(() => createRef<HTMLInputElement>()) : []),
    [files],
  );
  const layoutInputRef: React.RefObject<HTMLInputElement> = useMemo(
    () => createRef<HTMLInputElement>(),
    [],
  );

  // dispatch the click of a button to a input element via its ref
  const dispatchImportClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  // handle import click
  const handleImport = (fileIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;

    updateFile({ id: fileIndex, name: file.name });

    // to allow for same file input
    e.target.value = '';
  };

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fmdName: string,
    upload: (fmd: FormData) => void,
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;

    const fmd = new FormData();
    fmd.append(fmdName, file);

    upload(fmd);

    // to allow for same file input
    e.target.value = '';
  };

  const MainTable = (files: File[]) => {
    const getDescription = (file: File) => {
      return (
        <td>
          {file.description}
          {file.required ? <b className='text-danger'>*</b> : ''}
        </td>
      );
    };
    const getName = (file: File) => {
      return <td>{file.name ? file.name : '-'}</td>;
    };
    const getStatus = (status: number) => {
      return (
        <td className={statusToBootstrapClassMap.get(status)}>{statusToDescription.get(status)}</td>
      );
    };
    const getAction = (
      file: File,
      i: number,
      inputRef: React.RefObject<HTMLInputElement>,
      status: FileStatus,
    ) => {
      return (
        <td>
          <input
            ref={inputRef}
            onChange={(e) =>
              i === 3 ? handleUpload(e, 'bookmarks_file', uploadBookmarks) : handleImport(i, e)
            }
            className='d-none'
            type='file'
            accept={file.file_extensions.join(',')}
          />
          {status === FileStatus.NEEDS_PRE_PROCESSING && !isPreprocessing ? (
            <>
              <Button onClick={() => preprocess()} variant='outline-info' size='sm'>
                preprocess
              </Button>{' '}
              {i === 0 ? (
                <>
                  <input
                    ref={layoutInputRef}
                    onChange={(e) => handleUpload(e, 'layout_file', uploadLayout)}
                    className='d-none'
                    type='file'
                    accept={'.pickle'}
                  />
                  <Button
                    onClick={() => dispatchImportClick(layoutInputRef)}
                    variant='outline-primary'
                    size='sm'
                  >
                    local layout
                  </Button>{' '}
                </>
              ) : null}
            </>
          ) : null}
          {status !== FileStatus.NO_FILE ? (
            <Button
              onClick={() => {
                dispatch(resetPheno());
                dispatch(resetSelection());
                dispatch(resetLayout());
                clearFile({ id: i });
              }}
              variant='outline-danger'
              size='sm'
            >
              remove
            </Button>
          ) : (
            <>
              <Button
                onClick={() => dispatchImportClick(inputRef)}
                variant='outline-primary'
                size='sm'
              >
                import
              </Button>
            </>
          )}
        </td>
      );
    };

    return (
      <Table className='align-middle' bordered hover>
        <thead>
          <tr>
            <th>File description</th>
            <th>File name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, i) => {
            const status = file.status;
            const inputRef = importInputRefs[i];
            return (
              <tr
                key={'file-table-row-' + i}
                className={
                  (i === 1 && locationState && locationState.highlightPhenoTableRow) ||
                  (i === 3 && locationState && locationState.highlightBookmarksRow)
                    ? 'highlight-row'
                    : ''
                }
              >
                {getDescription(file)}
                {getName(file)}
                {getStatus(file.id === 0 && isPreprocessing ? FileStatus.PRE_PROCESSING : status)}
                {getAction(file, i, inputRef, status)}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return isLoading ? (
    <SpinnerAnnotated message='Waiting for the server to tell us which files you need' />
  ) : (
    <>
      {isError ? <ErrorCard message={'Something went wrong. Please try again'} /> : null}
      {MainTable(files)}
    </>
  );
};

// map to translate statuses to bootstrap class names
const statusToBootstrapClassMap = new Map<FileStatus, string>([
  [FileStatus.NO_FILE, 'table-danger'],
  [FileStatus.INVALID, 'table-warning'],
  [FileStatus.NEEDS_PRE_PROCESSING, 'table-info'],
  [FileStatus.PRE_PROCESSING, 'table-primary'],
  [FileStatus.READY, 'table-success'],
]);

// map to translate statuses to string status descriptions
const statusToDescription = new Map<FileStatus, string>([
  [FileStatus.NO_FILE, 'No file imported'],
  [FileStatus.INVALID, 'Invalid file'],
  [FileStatus.NEEDS_PRE_PROCESSING, 'Needs pre-processing'],
  [FileStatus.PRE_PROCESSING, 'Preprocessing...'],
  [FileStatus.READY, 'Ready for visualization'],
]);

export default FileTable;
