import { useState } from 'react';
import { updateDefaultSegmentThickness } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import RangeSegmentThickness from '../range/RangeSegmentThickness';

interface SegmentThicknessSettingProps {}

const SegmentThicknessSetting: React.FC<SegmentThicknessSettingProps> = (props) => {
  const segmentThickness = useAppSelector((state) => state.globalSettings.defaultSegmentThickness);
  const [value, setValue] = useState<number>(segmentThickness);
  const dispatch = useAppDispatch();
  
  return (
    <>
      <td>
        Default segment thickness: <b>{value}</b>
      </td>
      <td className='col-5'>
        <RangeSegmentThickness
          onChange={(newSegmentThickness) => setValue(newSegmentThickness)}
          onMousUp={() => dispatch(updateDefaultSegmentThickness(value))}
        />
      </td>
    </>
  );
};

export default SegmentThicknessSetting;
