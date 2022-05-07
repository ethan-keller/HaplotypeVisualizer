import { useState } from 'react';
import { updateSegmentThickness } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import RangeWithLabels from './RangeWithLabels';

const RangeSegmentThickness: React.FC = () => {
  const segmentThickness = useAppSelector((state) => state.graphSettings.segmentThickness);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(segmentThickness);

  return (
    <RangeWithLabels
      title={'Segment thickness'}
      min={2}
      max={20}
      step={1}
      value={value}
      onChange={(e) => setValue(e.target.valueAsNumber)}
      onMouseUp={(_) => dispatch(updateSegmentThickness(value))}
    />
  );
};

export default RangeSegmentThickness;
