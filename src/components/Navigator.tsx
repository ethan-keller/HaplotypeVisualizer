import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [1, 1, 1, 2, 2, 3, 2, 2, 1],
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0)',
      },
    ],
  };

interface NavigatorProps {}

const Navigator: React.FC<NavigatorProps> = (props) => {
    return <Line height={30} data={data} />;
};

export default Navigator;
