import { useState } from 'react';
import RangeWithLabels from './RangeWithLabels';

interface RangeHistogramBinsProps {
  onChange: (newBins: number) => void;
}

const RangeHistogramBins: React.FC<RangeHistogramBinsProps> = (props) => {
  const [value, setValue] = useState<number>(6);

  return (
    <RangeWithLabels
      title={'# Bins'}
      min={2}
      max={40}
      step={1}
      value={value}
      onChange={(e) => {
        setValue(e.target.valueAsNumber);
        props.onChange(e.target.valueAsNumber);
      }}
    />
  );
};

export default RangeHistogramBins;
