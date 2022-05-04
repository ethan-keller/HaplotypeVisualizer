import { useEffect } from 'react';
import { Modal, Table, Form } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { setActivePaths, toggleActivePath, updatePathColor } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import ColorPicker from '../ColorPicker';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface EditPathsModalProps {
  onHide: () => void;
  show: boolean;
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
    <Modal onHide={props.onHide} show={props.show} scrollable>
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
                    <ColorPicker
                      defaultColor={pathColors[path.index]}
                      onPick={(color) => dispatch(updatePathColor({ path: path.index, color: color }))}
                    />
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
      </Modal.Body>
    </Modal>
  );
};

export default EditPathsModal;
