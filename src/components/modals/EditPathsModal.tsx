import { useEffect } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { setActivePaths, toggleActivePath } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface EditPathsModalProps {
  onHide: () => void;
}

const EditPathsModal: React.FC<EditPathsModalProps> = (props) => {
  const { data: paths } = gfaApi.useGetPathsQuery();
  const dispatch = useAppDispatch();
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);
  const activePaths = useAppSelector((state) => state.graphSettings.activePaths);

  useEffect(() => {
    if (paths) dispatch(setActivePaths(paths.map((_) => true)));
  }, [dispatch, paths]);

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
                    <Form.Check
                      type='switch'
                      checked={activePaths.length === 0 ? true : activePaths[path.index]}
                      onChange={(e) => dispatch(toggleActivePath(i))}
                    />
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

export default EditPathsModal;
