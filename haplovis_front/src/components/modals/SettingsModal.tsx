import { Modal, Table } from 'react-bootstrap';
import DrawLabelsSetting from '../settings/DrawLabelsSetting';
import DrawPathsSetting from '../settings/DrawPathsSetting';
import LinkThicknessSetting from '../settings/LinkThicknessSetting';
import NavigatorBrushSetting from '../settings/NavigatorBrushSetting';
import NavigatorCompressionSetting from '../settings/NavigatorCompressionSetting';
import PanSetting from '../settings/PanSetting';
import SegmentThicknessSetting from '../settings/SegmentThicknessSetting';
import ZoomSetting from '../settings/ZoomSetting';

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
              <ZoomSetting />
            </tr>
            <tr>
              <PanSetting />
            </tr>
            <tr>
              <NavigatorCompressionSetting />
            </tr>
            <tr>
              <DrawPathsSetting />
            </tr>
            <tr>
              <DrawLabelsSetting />
            </tr>
            <tr>
              <SegmentThicknessSetting />
            </tr>
            <tr>
              <LinkThicknessSetting />
            </tr>
            <tr>
              <NavigatorBrushSetting />
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
