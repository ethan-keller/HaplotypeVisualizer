import layoutApi from '../../api/layout';
import SpinnerAnnotated from '../SpinnerAnnotated';
import Navigator from './Navigator';

interface NavigatorWrapperProps {}

const NavigatorWrapper: React.FC<NavigatorWrapperProps> = (props) => {
  const { data: densities } = layoutApi.useGetDensitiesQuery();

  return densities ? (
    <Navigator densities={densities.map((v, i) => ({ x: i, y: v }))} />
  ) : (
    <SpinnerAnnotated message='Loading density navigator' />
  );
};

export default NavigatorWrapper;
