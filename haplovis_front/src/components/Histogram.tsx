import { VictoryAxis, VictoryChart, VictoryHistogram } from 'victory';

interface BarPlotProps {
  values: number[];
}

const Histogram: React.FC<BarPlotProps> = (props) => {
  const sharedAxisStyles = {
    axis: {
      stroke: 'transparent',
    },
  };
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
            else return v / 100 / 10.0 + 'k';
          }}
          style={{
            ...sharedAxisStyles,
          }}
        />
        <VictoryHistogram
          style={{ data: { fill: '#0d6efd', strokeWidth: 0 } }}
          binSpacing={15}
          data={props.values.map((e) => ({
            x: e,
          }))}
        />
      </VictoryChart>
    </div>
  );
};

export default Histogram;
