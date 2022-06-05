import { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import filesApi from '../../api/files';
import { FileStatus } from '../../types/files';

interface ClearFilesButtonProps {}

const ClearFilesButton: React.FC<ClearFilesButtonProps> = (props) => {
  const { data: files } = filesApi.useGetAllFilesQuery();
  const [clearAllFiles] = filesApi.useClearAllMutation();
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
    <Button variant='danger' disabled={areAllFilesEmpty} onClick={() => clearAllFiles()}>
      Clear all
    </Button>
  );
};

export default ClearFilesButton;
