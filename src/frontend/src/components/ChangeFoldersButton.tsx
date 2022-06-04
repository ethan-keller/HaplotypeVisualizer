import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChangeFoldersModal from './modals/ChangeFoldersModal';

interface ChangeFolderButtonProps {}

const ChangeFoldersButton: React.FC<ChangeFolderButtonProps> = (props) => {
  const [showChangeFolder, setShowChangeFolder] = useState<boolean>(false);
  return (
    <>
      <Button size='sm' variant='secondary' onClick={() => setShowChangeFolder(true)}>
        Change folder locations
      </Button>
      <ChangeFoldersModal show={showChangeFolder} onHide={() => setShowChangeFolder(false)} />
    </>
  );
};

export default ChangeFoldersButton;
