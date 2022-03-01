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

    updateFile({ id: fileIndex, name: file.name })
      .unwrap()
      .catch((err) => {
        alert(err);
      });
  };

  const MainTable = (files: File[]) => (
    <Table className='align-middle' bordered hover>
      <thead>
        <tr>
          <th>File description</th>
          <th>File name</th>
          <th>Status</th>
          <th>Import/Remove</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, i) => {
          const status = file.status;
          const inputRef = inputRefs[i];
          return (
            <tr key={'file-table-row-' + i}>
              <td>
                {file.description}
                {file.required ? <b className='text-danger'>*</b> : ''}
              </td>
              <td>{file.name ? file.name : '-'}</td>
              <td className={statusToBootstrapClassMap.get(status)}>
                {statusToDescription.get(status)}
              </td>
              <td>
                <input
                  ref={inputRef}
                  onChange={() => handleImport(i, inputRef)}
                  className='d-none'
                  type='file'
                  accept={file.file_extensions.join(',')}
                />
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
                      local
                    </Button>{' '}
                    <Button
                      onClick={() => dispatchImportClick(inputRef)}
                      variant='outline-primary'
                      size='sm'
                    >
                      cluster
                    </Button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return !isLoading ? (
    <>
      {isError ? <ErrorCard message={'Something went wrong. Please try again'} /> : null}
      {MainTable(files)}
    </>
  ) : (
    <SpinnerAnnotated message='Waiting for the server to tell us which files you need' />
  );
};

// map to translate statuses to bootstrap class names
const statusToBootstrapClassMap = new Map<FileStatus, string>([
  [FileStatus.NO_FILE, 'table-danger'],
  [FileStatus.SUCCESSFUL, 'table-success'],
  [FileStatus.WARNING, 'table-warning'],
]);

// map to translate statuses to string status descriptions
const statusToDescription = new Map<FileStatus, string>([
  [FileStatus.NO_FILE, 'No file imported'],
  [FileStatus.SUCCESSFUL, 'Successfully imported'],
  [FileStatus.WARNING, 'Unsuccessfully imported'],
]);

export default FileTable;