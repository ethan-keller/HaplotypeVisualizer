import { useState } from 'react';
import { Button } from 'react-bootstrap';
import EditFoldersModal from './modals/EditFoldersModal';

interface EditFoldersButtonProps {}

const EditFoldersButton: React.FC<EditFoldersButtonProps> = (props) => {
  const [showEditFolders, setShowEditFolders] = useState<boolean>(false);
  return (
    <>
      <Button size='sm' variant='secondary' onClick={() => setShowEditFolders(true)}>
        Edit folders
      </Button>
      <EditFoldersModal show={showEditFolders} onHide={() => setShowEditFolders(false)} />
    </>
  );
};

export default EditFoldersButton;
