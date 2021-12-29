import React, { createRef, useEffect, useMemo, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UploadFile, UploadStatus } from '../models/file';
import FileCommunication from '../server_communication/FileCommunication';
import ErrorCard from './ErrorCard';
import SpinnerAnnotated from './SpinnerAnnotated';

interface UploadTableProps {
  setReady: (ready: boolean) => void;
}

const statusToBootstrapClassMap = new Map<UploadStatus, string>([
  [UploadStatus.NO_UPLOAD, 'table-danger'],
  [UploadStatus.SUCCESSFUL_UPLOAD, 'table-success'],
  [UploadStatus.WARNING_UPLOAD, 'table-warning'],
]);

const statusToDescription = new Map<UploadStatus, string>([
  [UploadStatus.NO_UPLOAD, 'No file uploaded'],
  [UploadStatus.SUCCESSFUL_UPLOAD, 'Successfully uploaded'],
  [UploadStatus.WARNING_UPLOAD, 'Unsuccessfully uploaded'],
]);

const UploadTable: React.FC<UploadTableProps> = (props) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  // will execute on mount and unmount
  useEffect(() => {
    updateUploadFiles();
  }, []);

  const updateUploadFiles = () => {
    FileCommunication.getAllFiles().then(
      (result: UploadFile[]) => {
        setIsLoaded(true);
        setUploadFiles(result.concat());
      },
      (error: Error) => {
        setIsLoaded(true);
        setError(error);
      },
    );
    handleReady();
  };

  const handleReady = () => {
    FileCommunication.ready().then(
      (result: boolean) => {
        props.setReady(result);
      },
      (err: Error) => {
        console.log(err);
      },
    );
  };

  const uploadInputRefs: React.RefObject<HTMLInputElement>[] = useMemo(
    () => uploadFiles.map(() => createRef<HTMLInputElement>()),
    [uploadFiles],
  );

  const dispatchUploadClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  const resetInputFile = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (!inputRef.current) return;
    if (!inputRef.current.files) return;
    inputRef.current.value = '';
  };

  const handleUpload = (fileIndex: number, inputRef: React.RefObject<HTMLInputElement>) => {
    if (!inputRef.current?.files) return;
    const file: File = inputRef.current?.files[0];
    if (!file) return;

    FileCommunication.updateFile(
      fileIndex,
      // The server then prepends with correct folder name to find file on server
      file.name,
    )
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        updateUploadFiles();
      });
  };

  const handleRemove = (fileIndex: number) => {
    FileCommunication.removeFile(fileIndex)
      .catch((err) => {
        console.log(err);
      })
      .then(() => updateUploadFiles());
  };

  return isLoaded ? (
    <>
      {!error ?? <ErrorCard message={'Something went wrong. Please try again'} />}
      <Table className='align-middle' bordered hover>
        <thead>
          <tr>
            <th>File description</th>
            <th>File name</th>
            <th>Status</th>
            <th>Upload/Remove</th>
          </tr>
        </thead>
        <tbody>
          {uploadFiles.map((uploadFile, i) => {
            const status = uploadFile.status;
            const inputRef = uploadInputRefs[i];
            return (
              <tr key={'upload-table-row-' + i}>
                <td>
                  {uploadFile.description}
                  {uploadFile.required ? <b className='text-danger'>*</b> : ''}
                </td>
                <td>{uploadFile.name ? uploadFile.name : '-'}</td>
                <td className={statusToBootstrapClassMap.get(status)}>
                  {statusToDescription.get(status)}
                </td>
                <td>
                  <input
                    ref={inputRef}
                    onChange={() => {
                      handleUpload(i, inputRef);
                      resetInputFile(inputRef);
                    }}
                    className='d-none'
                    type='file'
                    accept={uploadFile.file_extensions.join(',')}
                  />
                  {status !== UploadStatus.NO_UPLOAD ? (
                    <Button onClick={() => handleRemove(i)} variant='outline-danger' size='sm'>
                      remove
                    </Button>
                  ) : (
                    <Button
                      onClick={() => dispatchUploadClick(inputRef)}
                      variant='outline-primary'
                      size='sm'
                    >
                      upload
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  ) : (
    <SpinnerAnnotated message={'Waiting for the server to tell us which files you need'} />
  );
};

export default UploadTable;
