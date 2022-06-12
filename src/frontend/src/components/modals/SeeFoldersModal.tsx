import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import filesApi from '../../api/files';
import VerticalSpacer from '../VerticalSpacer';
import AlertModal from './AlertModal';
import ConfirmationModal from './ConfirmationModal';

interface SeeFoldersModalProps {
  onHide: () => void;
  show: boolean;
}

const SeeFoldersModal: React.FC<SeeFoldersModalProps> = (props) => {
  const { data: outputFolder } = filesApi.useGetOutputFolderQuery();
  const { data: dataFolder } = filesApi.useGetDataFolderQuery();
  const [clearFolder] = filesApi.useClearFolderMutation();
  const [showConfirmation, setShowConfirmation] = useState<string | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleClearFolder = (folder: string | undefined) => {
    if (folder) {
      clearFolder({ folder: folder })
        .unwrap()
        .catch(() => {
          setShowAlert(true);
        });
    }
  };

  return (
    <Modal onHide={props.onHide} show={props.show} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Folder locations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>OUTPUT</b>
        <div style={{ wordWrap: 'break-word' }}>{outputFolder ?? '-'}</div>
        <Button
          size='sm'
          variant='danger'
          style={{ marginTop: 8 }}
          onClick={() => setShowConfirmation('OUTPUT')}
        >
          Clear
        </Button>
        <VerticalSpacer space={40} />
        <b>DATA</b>
        <div style={{ wordWrap: 'break-word' }}>{dataFolder ?? '-'}</div>
      </Modal.Body>
      {showConfirmation ? (
        <ConfirmationModal
          title={'Clear ' + showConfirmation + ' folder'}
          description={'Are you sure you want to clear the ' + showConfirmation + ' folder?'}
          secondaryDescription={'This WILL delete the files in the ' + showConfirmation + ' folder'}
          show={showConfirmation !== undefined}
          onHide={() => setShowConfirmation(undefined)}
          confirmText='Clear'
          confirmButtonVariant='danger'
          onConfirm={() => handleClearFolder(showConfirmation)}
        />
      ) : null}
      <AlertModal
        title='Failed clearing folder'
        description='Could not delete folder contents'
        secondaryDescription='Please try again'
        show={showAlert}
        onHide={() => setShowAlert(false)}
      />
    </Modal>
  );
};

export default SeeFoldersModal;
