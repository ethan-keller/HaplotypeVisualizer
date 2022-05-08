import { useState } from 'react';
import { useAppSelector } from '../../store';
import PanRange from '../range/PanRange';

interface PanSettingProps {}

const PanSetting: React.FC<PanSettingProps> = (props) => {
  const panSensitivity = useAppSelector((state) => state.globalSettings.panSensitivity);
  const [value, setValue] = useState<number>(panSensitivity);
  return (
    <>
      <td>
        Pan sensitivity: <b>{value}</b>
      </td>
      <td className='col-5'>
        <PanRange onChange={(newPanSensitivity) => setValue(newPanSensitivity)} />
      </td>
    </>
  );
};

export default PanSetting;
