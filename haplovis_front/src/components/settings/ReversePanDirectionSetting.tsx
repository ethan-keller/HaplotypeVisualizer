import { Form } from 'react-bootstrap';
import { updateReversePan } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface ReversePanDirectionSettingProps {}

const ReversePanDirectionSetting: React.FC<ReversePanDirectionSettingProps> = (props) => {
  const reversePan = useAppSelector((state) => state.globalSettings.reversePan);
  const dispatch = useAppDispatch();

  return (
    <>
      <td>Reverse pan direction</td>
      <td className='col-5'>
        <Form.Check
          type='switch'
          checked={reversePan}
          onChange={(e) => {
            dispatch(updateReversePan(e.target.checked));
          }}
        />
      </td>
    </>
  );
};

export default ReversePanDirectionSetting;
