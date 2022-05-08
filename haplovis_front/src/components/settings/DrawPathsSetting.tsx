import { Form } from 'react-bootstrap';
import { updateDefaultDrawPaths } from '../../slices/globalSettings';
import { updateDrawPaths } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface DrawPathsSettingProps {}

const DrawPathsSetting: React.FC<DrawPathsSettingProps> = (props) => {
  const dispatch = useAppDispatch();
  const defaultDrawPaths = useAppSelector((state) => state.globalSettings.defaultDrawPaths);
  return (
    <>
      <td>Draw paths by default</td>
      <td className='col-5'>
        <Form.Check
          type='switch'
          checked={defaultDrawPaths}
          onChange={(e) => {
            dispatch(updateDefaultDrawPaths(e.target.checked));
            dispatch(updateDrawPaths(e.target.checked))
          }}
        />
      </td>
    </>
  );
};

export default DrawPathsSetting;
