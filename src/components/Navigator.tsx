import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface NavigatorProps {}

const data = [
  {
    density: 1,
  },
  {
    density: 1,
  },
  {
    density: 1,
  },
  {
    density: 2,
  },
  {
    density: 2,
  },
  {
    density: 3,
  },
  {
    density: 2,
  },
  {
    density: 2,
  },
  {
    density: 1,
  },
];

const Navigator: React.FC<NavigatorProps> = (props) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id='colorX' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#0d6efd' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#0d6efd' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={'e'} />
        <YAxis />
        <Tooltip />
        <Area
          type='linear'
          dataKey='density'
          stroke='#0d6efd'
          fillOpacity={1}
          fill='url(#colorX)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Navigator;
