import { createRef, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import FileManager, { UploadFile, UploadStatus } from '../data/FileManager';

interface UploadTableProps {
  uploadFiles: UploadFile[];
}

const statusToBootstrapMap = new Map<UploadStatus, string>([
  [UploadStatus.NO_UPLOAD, 'table-danger'],
  [UploadStatus.SUCCESSFUL_UPLOAD, 'table-success'],
  [UploadStatus.WARNING_UPLOAD, 'table-warning'],
]);

const UploadTable: React.FC<UploadTableProps> = (props) => {
  const uploadInputRefs: React.RefObject<HTMLInputElement>[] = useMemo(
    () => props.uploadFiles.map(() => createRef<HTMLInputElement>()),
    [props.uploadFiles],
  );

  const dispatchUploadClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  const handleUpload = (fileIndex: number, inputRef: React.RefObject<HTMLInputElement>) => {
    if (!inputRef.current?.files) return;
    const file: File = inputRef.current?.files[0];
    if (!file) return;

    FileManager.uploadFile(fileIndex, file.name, file.webkitRelativePath);
  };

  const handleRemove = (fileIndex: number) => {
    FileManager.removeFile(fileIndex);
  };

  return (
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
        {props.uploadFiles.map((uploadFile, i) => {
          const status = uploadFile.status;
          const inputRef = uploadInputRefs[i];
          return (
            <tr key={'upload-table-row-' + i}>
              <td>
                {uploadFile.fileDescription}
                {uploadFile.required ? <b className='text-danger'>*</b> : ''}
              </td>
              <td>{uploadFile.fileName ? uploadFile.fileName : '-'}</td>
              <td className={statusToBootstrapMap.get(status)}>{status}</td>
              <td>
                <input
                  ref={inputRef}
                  onChange={() => handleUpload(i, inputRef)}
                  className='d-none'
                  type='file'
                  accept={uploadFile.fileExtensions.join(',')}
                />
                {uploadFile.status !== UploadStatus.NO_UPLOAD ? (
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
  );
};

export default UploadTable;
