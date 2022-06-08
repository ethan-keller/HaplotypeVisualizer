import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import filesApi from '../../api/files';
import VerticalSpacer from '../VerticalSpacer';
import AlertModal from './AlertModal';
import ConfirmationModal from './ConfirmationModal';

interface EditFoldersModalProps {
  onHide: () => void;
  show: boolean;
}

const EditFoldersModal: React.FC<EditFoldersModalProps> = (props) => {
  const { data: outputFolder } = filesApi.useGetOutputFolderQuery();
  const { data: dataFolder } = filesApi.useGetDataFolderQuery();
  const [updateOutputFolder] = filesApi.useUpdateOutputFolderMutation();
  const [updateDataFolder] = filesApi.useUpdateDataFolderMutation();
  const [clearFolder] = filesApi.useClearFolderMutation();
  const [showConfirmation, setShowConfirmation] = useState<string | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const getFolderName = async () => {
    // @ts-ignore
    const dirHandle = await window.showDirectoryPicker();
    return dirHandle.name;
  };

  const handleUpdateOutputFolder = (newFolderName: string) => {
    updateOutputFolder({ new_folder: newFolderName })
      .unwrap()
      .catch((_) => {
        alert('Could not update ouput folder name');
      });
  };

  const handleUpdateDataFolder = (newFolderName: string) => {
    updateDataFolder({ new_folder: newFolderName })
      .unwrap()
      .catch((_) => {
        alert('Could not update data folder name');
      });
  };

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
        <Modal.Title>Change folder locations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>OUTPUT</b>
        <div style={{ wordWrap: 'break-word' }}>{outputFolder ?? '-'}</div>
        <Button
          size='sm'
          variant='secondary'
          style={{ marginTop: 8 }}
          onClick={() => {
            getFolderName().then((folderName) => {
              handleUpdateOutputFolder(folderName);
            });
          }}
        >
          Change folder
        </Button>{' '}
        <Button
          size='sm'
          variant='danger'
          style={{ marginTop: 8 }}
          onClick={() => setShowConfirmation('OUTPUT')}
        >
          Clear folder
        </Button>
        <VerticalSpacer space={40} />
        <b>DATA</b>
        <div style={{ wordWrap: 'break-word' }}>{dataFolder ?? '-'}</div>
        <Button
          size='sm'
          variant='secondary'
          style={{ marginTop: 8 }}
          onClick={() => {
            getFolderName().then((folderName) => {
              handleUpdateDataFolder(folderName);
            });
          }}
        >
          Change folder
        </Button>{' '}
        <Button
          size='sm'
          variant='danger'
          style={{ marginTop: 8 }}
          onClick={() => setShowConfirmation('DATA')}
        >
          Clear folder
        </Button>
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

export default EditFoldersModal;
