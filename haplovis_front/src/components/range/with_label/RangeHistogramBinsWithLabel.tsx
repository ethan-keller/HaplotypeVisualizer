import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../../store';
import RangeHistogramBins from '../RangeHistogramBins';

interface RangeHistogramBinsWithLabelProps {
  title: string;
}

const RangeHistogramBinsWithLabel: React.FC<RangeHistogramBinsWithLabelProps> = (props) => {
  const bins = useAppSelector((state) => state.globalSettings.defaultHistogramBins);
  return (
    <>
      <Form.Label>
        {props.title + ': '}
        <b>{bins}</b>
      </Form.Label>
      <RangeHistogramBins />
    </>
  );
};

export default RangeHistogramBinsWithLabel;
