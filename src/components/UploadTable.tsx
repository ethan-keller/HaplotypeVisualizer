import { createRef, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { UploadFile, UploadStatus } from '../models/file';
import FileCommunication from '../server_communication/FileCommunication';

interface UploadTableProps {
  uploadFiles: UploadFile[];
  setUploadFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
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

    let newUploadFiles = props.uploadFiles.concat();
    newUploadFiles[fileIndex].name = file.name;
    newUploadFiles[fileIndex].path = "Don't know how to do this yet";
    // file communication
    props.setUploadFiles(newUploadFiles);
  };

  const handleRemove = (fileIndex: number) => {};

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
                  onChange={() => handleUpload(i, inputRef)}
                  className='d-none'
                  type='file'
                  accept={uploadFile.file_extensions.join(',')}
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
