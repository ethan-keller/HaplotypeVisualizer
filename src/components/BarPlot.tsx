import {
  BarChart,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { GfaHist } from '../types/gfa';

interface BarPlotProps {
  hist: GfaHist;
}

const BarPlot: React.FC<BarPlotProps> = (props) => {
  const values = props.hist.hist;
  const binEdges = props.hist.bin_edges;

  if (values.length === 0) return null;

  // Length of the values array is at least 1 so there are at least 2 bin edges
  const barSize = binEdges[1] - binEdges[0];

  let data = [];
  for (let i = 0; i < values.length; i++) {
    data.push({ edge: binEdges[i + 1], frequency: values[i] });
  }

  return (
    <ResponsiveContainer width={'100%'} height={200}>
      <BarChart margin={{ top: 10, bottom: 30, right: 70 }} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type={'number'} dataKey={'edge'} tickCount={values.length}>
          <Label value='Segment length' offset={25} position='bottom' />
        </XAxis>
        <YAxis>
          <Label value='Freq.' angle={-90} position={'center'} />
        </YAxis>
        <Tooltip />
        <Brush
          tickFormatter={(v, i) => Math.round(+v)}
          alwaysShowText
          dataKey={'edge'}
          height={15}
          stroke='#0d6efd'
        />
        <Bar barSize={barSize} dataKey={'frequency'} fill='#0d6efd' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarPlot;
