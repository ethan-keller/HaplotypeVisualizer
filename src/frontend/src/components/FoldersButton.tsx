import { useState } from 'react';
import { Button } from 'react-bootstrap';
import SeeFoldersModal from './modals/SeeFoldersModal';

interface FoldersButtonProps {}

const FoldersButton: React.FC<FoldersButtonProps> = (props) => {
  const [showEditFolders, setShowEditFolders] = useState<boolean>(false);
  return (
    <>
      <Button size='sm' variant='secondary' onClick={() => setShowEditFolders(true)}>
        Folders
      </Button>
      <SeeFoldersModal show={showEditFolders} onHide={() => setShowEditFolders(false)} />
    </>
  );
};

export default FoldersButton;
