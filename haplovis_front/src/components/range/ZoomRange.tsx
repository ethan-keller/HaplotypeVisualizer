import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateZoomScale } from '../../slices/globalSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface ZoomRangeProps {}

const ZoomRange: React.FC<ZoomRangeProps> = (props) => {
  const zoomScale = useAppSelector((state) => state.globalSettings.zoomScale);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(zoomScale);

  return (
    <>
      <td>
        Zoom sensitivity: <b>{value}</b>
      </td>
      <td className='col-5'>
        <Form.Range
          min={0.01}
          max={0.5}
          step={0.01}
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onMouseUp={(_) => dispatch(updateZoomScale(value))}
        />
      </td>
    </>
  );
};

export default ZoomRange;
