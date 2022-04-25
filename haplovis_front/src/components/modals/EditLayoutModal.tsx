import { Button, Modal, Form, Table } from 'react-bootstrap';

interface EditLayoutModalProps {
  onHide: () => void;
  show: boolean;
}

const EditLayoutModal: React.FC<EditLayoutModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Edit layout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table style={{ fontWeight: 100 }} size='sm'>
          <tbody>
            <tr>
              <td>Node separation</td>
              <td>
                <Form.Range />
              </td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </Table>

        <Button>Edit layout</Button>
      </Modal.Body>
    </Modal>
  );
};

export default EditLayoutModal;
