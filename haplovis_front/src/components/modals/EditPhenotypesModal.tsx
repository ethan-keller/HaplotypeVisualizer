import { ListGroup, Modal, Form, Table } from 'react-bootstrap';
import phenoApi from '../../api/pheno';
import ColorPicker from '../ColorPicker';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';
interface EditPhenotypesModalProps {
  onHide: () => void;
  show: boolean;
}

const EditPhenotypesModal: React.FC<EditPhenotypesModalProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  return (
    <Modal onHide={props.onHide} show={props.show} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit phenotype colors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {phenotypes ? (
          Object.entries(phenotypes).map(([k, vs], i) => (
            <>
              <h6>{k}</h6>
              <ListGroup>
                {vs.map((v) => (
                  <ListGroup.Item style={{ padding: '0.2rem 1rem' }}>
                    <Table bordered={false} borderless style={{ margin: 0 }}>
                      <tbody>
                        <tr className='d-flex'>
                          <td className='col-5 my-auto'>
                            <Form.Check />
                          </td>
                          <td className='col-5 my-auto'>{v}</td>
                          <td className='col-2 my-auto'>
                            <ColorPicker
                              defaultColor='#ef9994'
                              onPick={(color) => console.log(color)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <VerticalSpacer space={10} />
            </>
          ))
        ) : (
          <SpinnerAnnotated message='Loading phenotypes' />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditPhenotypesModal;
