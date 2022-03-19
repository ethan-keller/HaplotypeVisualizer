import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import layoutApi from '../api/layout';
import SpinnerAnnotated from './SpinnerAnnotated';

interface NavigatorProps {}

const Navigator: React.FC<NavigatorProps> = (props) => {
  const { data: densities } = layoutApi.useGetDensitiesQuery();

  let d: { x: number; density?: number }[] = [];
  let a = 0;
  if (densities) {
    for (let i = 0; i < densities.xs.length; i++) {
      const x = densities.xs[i];
      while (a < x) {
        d.push({ x: a });
        a++;
      }
      d.push({ x: densities.xs[i], density: densities.densities[i] });
      a++;
    }
  }

  return densities ? (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={d}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'x'} />
        <YAxis hide />
        <Tooltip />
        <Area connectNulls type='linear' dataKey='density' fill='#0d6efd' />
        <Brush travellerWidth={20} height={20} dataKey={'x'} />
      </AreaChart>
    </ResponsiveContainer>
  ) : (
    <SpinnerAnnotated message='Loading density navigator' />
  );
};

export default Navigator;
