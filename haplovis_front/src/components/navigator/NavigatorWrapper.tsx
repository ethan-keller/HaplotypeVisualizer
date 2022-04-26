import layoutApi from '../../api/layout';
import { Position } from '../../types/layout';
import SpinnerAnnotated from '../SpinnerAnnotated';
import Navigator from './Navigator';

interface NavigatorWrapperProps {}

const NavigatorWrapper: React.FC<NavigatorWrapperProps> = (props) => {
  const { data: densities } = layoutApi.useGetDensitiesQuery();

  let d: Position[] = [];
  if (densities) {
    for (let i = 0; i < densities.length; i++) {
      d.push({ x: i, y: densities[i] });
    }
  }

  return densities ? (
    <Navigator data={d} />
  ) : (
    <SpinnerAnnotated message='Loading density navigator' />
  );
};

export default NavigatorWrapper;
