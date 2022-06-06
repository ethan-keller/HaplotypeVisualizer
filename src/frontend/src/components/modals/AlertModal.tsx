import { Button, Modal } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';

interface AlertModalProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  onHide: () => void;
  show: boolean;
}

const AlertModal: React.FC<AlertModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <TiWarningOutline size={28} color='orange' style={{ margin: 3, marginRight: 10}} />
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.description}</p>
        <p>{props.secondaryDescription}</p>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
