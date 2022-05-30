import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateSegmentThickness } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface RangeSegmentThicknessProps {
  onChange: (newSegmentThickness: number) => void;
  onMousUp?: () => void;
}

const RangeSegmentThickness: React.FC<RangeSegmentThicknessProps> = (props) => {
  const segmentThickness = useAppSelector((state) => state.graphSettings.segmentThickness);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(segmentThickness);

  return (
    <Form.Range
      min={2}
      max={20}
      step={1}
      value={value}
      onChange={(e) => {
        const n = e.target.valueAsNumber;
        setValue(n);
        props.onChange(n);
      }}
      onMouseUp={(_) =>
        props.onMousUp ? props.onMousUp() : dispatch(updateSegmentThickness(value))
      }
    />
  );
};

export default RangeSegmentThickness;
