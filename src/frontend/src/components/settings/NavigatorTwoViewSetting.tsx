import { Form } from 'react-bootstrap';
import { updateNavigatorTwoViews } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface NavigatorTwoViewSettingProps {}

const NavigatorTwoViewSetting: React.FC<NavigatorTwoViewSettingProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigatorTwoViews = useAppSelector((state) => state.globalSettings.navigatorTwoViews);
  return (
    <>
      <td>Show two navigator views</td>
      <td className='col-5'>
        <Form.Check
          type='switch'
          checked={navigatorTwoViews}
          onChange={(e) => {
            dispatch(updateNavigatorTwoViews(e.target.checked));
          }}
        />
      </td>
    </>
  );
};

export default NavigatorTwoViewSetting;
