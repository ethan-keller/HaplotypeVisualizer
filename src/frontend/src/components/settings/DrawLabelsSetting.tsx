import { Form } from 'react-bootstrap';
import { updateDefaultDrawLabels } from '../../slices/globalSettings';
import { updateDrawLabels } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface DrawLabelsSettingProps {}

const DrawLabelsSetting: React.FC<DrawLabelsSettingProps> = (props) => {
  const dispatch = useAppDispatch();
  const defaultDrawLabels = useAppSelector((state) => state.globalSettings.defaultDrawLabels);
  return (
    <>
      <td>Draw labels by default</td>
      <td className='col-5'>
        <Form.Check
          type='switch'
          checked={defaultDrawLabels}
          onChange={(e) => {
            dispatch(updateDefaultDrawLabels(e.target.checked));
            dispatch(updateDrawLabels(e.target.checked));
          }}
        />
      </td>
    </>
  );
};

export default DrawLabelsSetting;
