import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { updatePanSensitivity } from '../../slices/graphSettings';
import { useAppSelector, useAppDispatch } from '../../store';

interface PanRangeProps {}

const PanRange: React.FC<PanRangeProps> = (props) => {
  const panSensitivity = useAppSelector((state) => state.graphSettings.panSensitivity);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(panSensitivity);

  return (
    <>
      <td>
        Pan sensitivity: <b>{value}</b>
      </td>
      <td className='col-5'>
        <Form.Range
          min={10}
          max={800}
          step={10}
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onMouseUp={(_) => dispatch(updatePanSensitivity(value))}
        />
      </td>
    </>
  );
};

export default PanRange;
