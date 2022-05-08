import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { updatePanSensitivity } from '../../slices/globalSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface PanRangeProps {
  onChange: (newPanSensitivity: number) => void;
}

const PanRange: React.FC<PanRangeProps> = (props) => {
  const panSensitivity = useAppSelector((state) => state.globalSettings.panSensitivity);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(panSensitivity);

  return (
    <Form.Range
      min={10}
      max={800}
      step={10}
      value={value}
      onChange={(e) => {
        const n = e.target.valueAsNumber;
        setValue(n);
        props.onChange(n);
      }}
      onMouseUp={(_) => dispatch(updatePanSensitivity(value))}
    />
  );
};

export default PanRange;
