import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateLinkThickness } from '../../slices/graphSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface RangeLinkThicknessProps {
  onChange: (newLinkThickness: number) => void;
  onMousUp?: () => void;
}

const RangeLinkThickness: React.FC<RangeLinkThicknessProps> = (props) => {
  const linkThickness = useAppSelector((state) => state.graphSettings.linkThickness);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(linkThickness);

  return (
    <Form.Range
      min={0.2}
      max={3}
      step={0.1}
      onChange={(e) => {
        const n = e.target.valueAsNumber;
        setValue(n);
        props.onChange(n);
      }}
      onMouseUp={(_) => (props.onMousUp ? props.onMousUp() : dispatch(updateLinkThickness(value)))}
    />
  );
};

export default RangeLinkThickness;
