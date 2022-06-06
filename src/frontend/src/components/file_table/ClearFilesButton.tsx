import { useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import filesApi from '../../api/files';
import { FileStatus } from '../../types/files';
import ConfirmationModal from '../modals/ConfirmationModal';

interface ClearFilesButtonProps {}

const ClearFilesButton: React.FC<ClearFilesButtonProps> = (props) => {
  const { data: files } = filesApi.useGetAllFilesQuery();
  const [clearAllFiles] = filesApi.useClearAllMutation();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const areAllFilesEmpty = useMemo(() => {
    if (files) {
      for (const file of files) {
        if (file.status !== FileStatus.NO_FILE) {
          return false;
        }
      }
    }
    return true;
  }, [files]);

  return (
    <>
      <Button
        variant='danger'
        disabled={areAllFilesEmpty}
        onClick={() => setShowConfirmation(true)}
      >
        Clear all
      </Button>
      <ConfirmationModal
        title='Clear all files'
        description='Are you sure you want to clear all files?'
        secondaryDescription='This will NOT delete your files'
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        confirmText='Clear'
        confirmButtonVariant='danger'
        onConfirm={() => clearAllFiles()}
      />
    </>
  );
};

export default ClearFilesButton;
