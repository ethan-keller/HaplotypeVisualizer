import { Form } from 'react-bootstrap';
import { updateDrawArrows } from '../../slices/graphSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface DrawArrowsSettingProps {}

const DrawArrowsSetting: React.FC<DrawArrowsSettingProps> = (props) => {
  const drawArrows = useAppSelector((state) => state.graphSettings.drawArrows);
  const dispatch = useAppDispatch();

  return (
    <>
      <td>Draw edge arrows</td>
      <td className='col-5'>
        <Form.Check
          type='switch'
          checked={drawArrows}
          onChange={(e) => {
            dispatch(updateDrawArrows(e.target.checked));
          }}
        />
      </td>
    </>
  );
};

export default DrawArrowsSetting;
