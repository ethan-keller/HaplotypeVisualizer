import React, { createRef, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { File, FileStatus } from '../../types/files';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';
import filesApi from '../../api/files';

interface FileTableProps {}

const FileTable: React.FC<FileTableProps> = (props) => {
  const { data: files = [], isLoading, isError } = filesApi.useGetAllFilesQuery();
  const [clearFile] = filesApi.useClearFileMutation();
  const [updateFile] = filesApi.useUpdateFileMutation();
  const [preprocess, { isLoading: isPreprocessing }] = filesApi.usePreprocessMutation();

  // create refs for inputs
  const inputRefs: React.RefObject<HTMLInputElement>[] = useMemo(
    () => (files ? files.map(() => createRef<HTMLInputElement>()) : []),
    [files],
  );

  // dispatch the click of a button to a input element via its ref
  const dispatchImportClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  // handle import click
  const handleImport = (fileIndex: number, inputRef: React.RefObject<HTMLInputElement>) => {
    if (!inputRef.current?.files) return;
    const file = inputRef.current?.files[0];
    if (!file) return;

    updateFile({ id: fileIndex, name: file.name });
  };

  const MainTable = (files: File[]) => {
    const getDescriptionRow = (file: File) => {
      return (
        <td>
          {file.description}
          {file.required ? <b className='text-danger'>*</b> : ''}
        </td>
      );
    };
    const getNameRow = (file: File) => {
      return <td>{file.name ? file.name : '-'}</td>;
    };
    const getStatusRow = (status: number) => {
      return (
        <td className={statusToBootstrapClassMap.get(status)}>{statusToDescription.get(status)}</td>
      );
    };
    const getActionRow = (
      file: File,
      i: number,
      inputRef: React.RefObject<HTMLInputElement>,
      status: FileStatus,
    ) => {
      return (
        <td>
          <input
            ref={inputRef}
            onChange={() => handleImport(i, inputRef)}
            className='d-none'
            type='file'
            accept={file.file_extensions.join(',')}
          />
          {status === FileStatus.NEEDS_PRE_PROCESSING && !isPreprocessing ? (
            <>
              <Button onClick={() => preprocess()} variant='outline-info' size='sm'>
                preprocess
              </Button>{' '}
            </>
          ) : null}
          {status !== FileStatus.NO_FILE ? (
            <Button onClick={() => clearFile({ id: i })} variant='outline-danger' size='sm'>
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
              </Button>{' '}
              <Button
                onClick={() => dispatchImportClick(inputRef)}
                variant='outline-primary'
                size='sm'
              >
                local layout
              </Button>{' '}
              <Button
                onClick={() => dispatchImportClick(inputRef)}
                variant='outline-primary'
                size='sm'
              >
                cluster layout
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
            const inputRef = inputRefs[i];
            return (
              <tr key={'file-table-row-' + i}>
                {getDescriptionRow(file)}
                {getNameRow(file)}
                {getStatusRow(
                  file.id === 0 && isPreprocessing ? FileStatus.PRE_PROCESSING : status,
                )}
                {getActionRow(file, i, inputRef, status)}
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
  [FileStatus.PRE_PROCESSING, 'Pre processing...'],
  [FileStatus.READY, 'Ready for visualization'],
]);

export default FileTable;
