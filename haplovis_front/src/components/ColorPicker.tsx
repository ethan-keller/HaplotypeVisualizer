import { useState } from 'react';
import { Form } from 'react-bootstrap';

interface ColorPickerProps {
  defaultColor: string;
  onPick: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [color, setColor] = useState<string>(props.defaultColor);

  return (
    <Form.Control
      className='color-picker'
      type='color'
      size='sm'
      defaultValue={props.defaultColor}
      onChange={(e) => setColor(e.target.value)}
      onBlur={(_) => props.onPick(color)}
    />
  );
};

export default ColorPicker;
