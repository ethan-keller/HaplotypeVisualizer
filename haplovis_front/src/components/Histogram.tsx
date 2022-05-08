import { useMemo } from 'react';
import { VictoryAxis, VictoryChart, VictoryHistogram } from 'victory';
import { useAppSelector } from '../store';
import RangeHistogramBinsWithLabel from './range/with_label/RangeHistogramBinsWithLabel';

interface BarPlotProps {
  values: number[];
}

const Histogram: React.FC<BarPlotProps> = (props) => {
  const bins = useAppSelector((state) => state.globalSettings.defaultHistogramBins);
  const sharedAxisStyles = {
    axis: {
      stroke: 'transparent',
    },
  };
  const data = useMemo(() => {
    return props.values.map((e) => ({
      x: e,
    }));
  }, [props.values]);
  return (
    <div style={{ backgroundColor: 'aliceblue' }}>
      <VictoryChart>
        <VictoryAxis
          style={{
            ...sharedAxisStyles,
            grid: {
              stroke: 'black',
              strokeWidth: 0.5,
            },
          }}
          label='Absolute abundance'
          dependentAxis
        />
        <VictoryAxis
          label='Segment length'
          tickFormat={(v) => {
            if (+v < 1000) return v;
            else return +v / 100 / 10.0 + 'k';
          }}
          style={{
            ...sharedAxisStyles,
          }}
        />
        <VictoryHistogram
          style={{ data: { fill: '#0d6efd', strokeWidth: 0 } }}
          binSpacing={15}
          data={data}
          bins={bins}
        />
      </VictoryChart>
      <div style={{ width: '85%', margin: 'auto' }}>
        <RangeHistogramBinsWithLabel title='# bins' />
      </div>
    </div>
  );
};

export default Histogram;
