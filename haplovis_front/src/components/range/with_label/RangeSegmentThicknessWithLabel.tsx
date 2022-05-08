import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../../store';
import RangeSegmentThickness from '../RangeSegmentThickness';

interface RangeSegmentThicknessWithLabelProps {
  title: string;
}

const RangeSegmentThicknessWithLabel: React.FC<RangeSegmentThicknessWithLabelProps> = (props) => {
  const segmentThickness = useAppSelector((state) => state.graphSettings.segmentThickness);
  const [value, setValue] = useState<number>(segmentThickness);
  return (
    <>
      <Form.Label>
        {props.title + ': '}
        <b>{value}</b>
      </Form.Label>
      <RangeSegmentThickness onChange={(newSegmentThickness) => setValue(newSegmentThickness)} />
    </>
  );
};

export default RangeSegmentThicknessWithLabel;
