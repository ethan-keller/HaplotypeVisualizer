import { ChangeEventHandler, MouseEventHandler } from 'react';
import { Form } from 'react-bootstrap';

interface RangeWithLabelProps {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onMouseUp?: MouseEventHandler<HTMLInputElement>;
}

const RangeWithLabels: React.FC<RangeWithLabelProps> = (props) => {
  return (
    <>
      <Form.Label>
        {props.title + ': '}
        <b>{props.value}</b>
      </Form.Label>
      <Form.Range
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
        onMouseUp={props.onMouseUp}
      />
    </>
  );
};

export default RangeWithLabels;
