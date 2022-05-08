import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../../store';
import RangeLinkThickness from '../RangeLinkThickness';

interface RangeLinkThicknessWithLabelProps {
  title: string;
}

const RangeLinkThicknessWithLabel: React.FC<RangeLinkThicknessWithLabelProps> = (props) => {
  const linkThickness = useAppSelector((state) => state.graphSettings.linkThickness);
  const [value, setValue] = useState<number>(linkThickness);
  return (
    <>
      <Form.Label>
        {props.title + ': '}
        <b>{value}</b>
      </Form.Label>
      <RangeLinkThickness onChange={(newLinkThickness) => setValue(newLinkThickness)} />
    </>
  );
};

export default RangeLinkThicknessWithLabel;
