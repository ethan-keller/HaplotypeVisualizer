import { Form } from 'react-bootstrap';
import { updateHistogramBins } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';

interface RangeHistogramBinsProps {}

const RangeHistogramBins: React.FC<RangeHistogramBinsProps> = (props) => {
  const dispatch = useAppDispatch();
  const histogramBins = useAppSelector((state) => state.globalSettings.defaultHistogramBins);

  return (
    <Form.Range
      min={2}
      max={40}
      step={1}
      value={histogramBins}
      onChange={(e) => dispatch(updateHistogramBins(e.target.valueAsNumber))}
    />
  );
};

export default RangeHistogramBins;
