import { useState } from 'react';
import { useAppSelector } from '../../store';
import ZoomRange from '../range/ZoomRange';

interface ZoomSettingProps {}

const ZoomSetting: React.FC<ZoomSettingProps> = (props) => {
  const zoomScale = useAppSelector((state) => state.globalSettings.zoomScale);
  const [value, setValue] = useState<number>(zoomScale);
  return (
    <>
      <td>
        Zoom sensitivity: <b>{value}</b>
      </td>
      <td className='col-5'>
        <ZoomRange onChange={(newZoomScale) => setValue(newZoomScale)} />
      </td>
    </>
  );
};

export default ZoomSetting;
