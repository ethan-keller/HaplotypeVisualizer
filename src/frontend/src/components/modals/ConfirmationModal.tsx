import { Modal, Button } from 'react-bootstrap';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface ConfirmationModalProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  onHide: () => void;
  show: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText: string;
  confirmButtonVariant?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <BsFillCheckCircleFill size={22} color='green' style={{ margin: 3, marginRight: 10 }} />
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.description}</p>
        <p>{props.secondaryDescription}</p>
        <Button
          variant={props.confirmButtonVariant ?? 'primary'}
          onClick={() => {
            props.onConfirm();
            props.onHide();
          }}
        >
          {props.confirmText}
        </Button>{' '}
        <Button
          variant='secondary'
          onClick={() => {
            if (props.onCancel) {
              props.onCancel();
            }
            props.onHide();
          }}
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
