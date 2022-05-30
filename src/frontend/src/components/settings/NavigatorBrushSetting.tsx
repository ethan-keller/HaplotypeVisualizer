import { Form } from 'react-bootstrap';
import { updateNavigatorBrush } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface NavigatorBrushSettingProps {}

const NavigatorBrushSetting: React.FC<NavigatorBrushSettingProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigatorBrush = useAppSelector((state) => state.globalSettings.navigatorBrush);
  return (
    <>
      <td>Show navigator overlay</td>
      <td className='col-5'>
        <Form.Check
          type='switch'
          checked={navigatorBrush}
          onChange={(e) => {
            dispatch(updateNavigatorBrush(e.target.checked));
          }}
        />
      </td>
    </>
  );
};

export default NavigatorBrushSetting;
