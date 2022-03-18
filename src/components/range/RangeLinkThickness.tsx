import { useState } from 'react';
import { updateLinkThickness } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import RangeWithLabels from './RangeWithLabels';

const RangeLinkThickness: React.FC = () => {
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(graphSettings.linkThickness);

  return (
    <RangeWithLabels
      title={'Link thickness'}
      min={0.2}
      max={3}
      step={0.1}
      value={value}
      onChange={(e) => setValue(e.target.valueAsNumber)}
      onMouseUp={(_) => dispatch(updateLinkThickness(value))}
    />
  );
};

export default RangeLinkThickness;
