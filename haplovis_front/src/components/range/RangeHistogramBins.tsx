import { updateHistogramBins } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import RangeWithLabels from './RangeWithLabels';

interface RangeHistogramBinsProps {}

const RangeHistogramBins: React.FC<RangeHistogramBinsProps> = (props) => {
  const dispatch = useAppDispatch();
  const histogramBins = useAppSelector((state) => state.globalSettings.histogramBins);

  return (
    <RangeWithLabels
      title={'# Bins'}
      min={2}
      max={40}
      step={1}
      value={histogramBins}
      onChange={(e) => dispatch(updateHistogramBins(e.target.valueAsNumber))}
    />
  );
};

export default RangeHistogramBins;
