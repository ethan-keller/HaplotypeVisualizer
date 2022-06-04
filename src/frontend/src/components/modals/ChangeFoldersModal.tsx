import { Button, Modal } from 'react-bootstrap';
import filesApi from '../../api/files';
import VerticalSpacer from '../VerticalSpacer';

interface ChangeFoldersModalProps {
  onHide: () => void;
  show: boolean;
}

const ChangeFoldersModal: React.FC<ChangeFoldersModalProps> = (props) => {
  const { data: outputFolder } = filesApi.useGetOutputFolderQuery();
  const { data: dataFolder } = filesApi.useGetDataFolderQuery();
  const [updateOutputFolder] = filesApi.useUpdateOutputFolderMutation();
  const [updateDataFolder] = filesApi.useUpdateDataFolderMutation();

  const getFolderName = async () => {
    try {
      // @ts-ignore
      const dirHandle = await window.showDirectoryPicker();
      return dirHandle.name;
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateOutputFolder = (newFolderName: string) => {
    updateOutputFolder({ new_folder: newFolderName })
      .unwrap()
      .catch((e) => {
        alert('Could not update ouput folder name');
      });
  };

  const handleUpdateDataFolder = (newFolderName: string) => {
    updateDataFolder({ new_folder: newFolderName })
      .unwrap()
      .catch((e) => {
        alert('Could not update data folder name');
      });
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
          onClick={async () => {
            const folderName = await getFolderName();
            handleUpdateOutputFolder(folderName);
          }}
        >
          Change folder
        </Button>

        <VerticalSpacer space={40} />

        <b>DATA</b>
        <div style={{ wordWrap: 'break-word' }}>{dataFolder ?? '-'}</div>
        <Button
          size='sm'
          variant='secondary'
          style={{ marginTop: 8 }}
          onClick={async () => {
            const folderName = await getFolderName();
            handleUpdateDataFolder(folderName);
          }}
        >
          Change folder
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeFoldersModal;
