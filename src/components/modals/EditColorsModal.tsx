import { Button, Modal, Table, Form } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { useAppSelector } from '../../store';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface EditColorsModalProps {
  onHide: () => void;
}

const EditColorsModal: React.FC<EditColorsModalProps> = (props) => {
  const { data: paths } = gfaApi.useGetPathsQuery();
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);

  return (
    <Modal onHide={props.onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>Edit paths</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {paths ? (
          <Table size='sm'>
            <tbody>
              <tr>
                <td className='text-start'>Name</td>
                <td className='text-center'>Color</td>
                <td className='text-end'>Active</td>
              </tr>
              {paths.map((path, i) => (
                <tr key={'path_' + i} style={{ fontWeight: 100 }}>
                  <td className='text-start'>{path.name}</td>
                  <td className='text-center'>
                    <Button style={{ border: 0, backgroundColor: pathColors[path.index] }} />
                  </td>
                  <td className='text-end'>
                    <Form.Check checked type='switch' />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <SpinnerAnnotated message='Loading path colors' />
        )}

        <Button>Edit paths</Button>
      </Modal.Body>
    </Modal>
  );
};

export default EditColorsModal;
