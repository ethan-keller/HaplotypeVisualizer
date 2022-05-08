import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateZoomScale } from '../../slices/globalSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface ZoomRangeProps {
  onChange: (newZoomScale: number) => void;
}

const ZoomRange: React.FC<ZoomRangeProps> = (props) => {
  const zoomScale = useAppSelector((state) => state.globalSettings.zoomScale);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(zoomScale);

  return (
    <Form.Range
      min={0.01}
      max={0.5}
      step={0.01}
      value={value}
      onChange={(e) => {
        const n = e.target.valueAsNumber;
        setValue(n);
        props.onChange(n);
      }}
      onMouseUp={(_) => dispatch(updateZoomScale(value))}
    />
  );
};

export default ZoomRange;
