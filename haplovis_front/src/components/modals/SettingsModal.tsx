import { Modal, Table } from 'react-bootstrap';
import PanRange from '../range/PanRange';
import ZoomRange from '../range/ZoomRange';
import NavigatorDownSampleSelect from '../select/NavigatorDownSampleSelect';

interface SettingsModalProps {
  show: boolean;
  onHide: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table style={{ fontWeight: 100 }} size='sm'>
          <tbody className='align-middle'>
            <tr>
              <ZoomRange />
            </tr>
            <tr>
              <PanRange />
            </tr>
            <tr>
              <NavigatorDownSampleSelect />
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
