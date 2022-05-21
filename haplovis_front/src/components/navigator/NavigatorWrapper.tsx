import layoutApi from '../../api/layout';
import { useAppSelector } from '../../store';
import SpinnerAnnotated from '../SpinnerAnnotated';
import Navigator from './Navigator';

interface NavigatorWrapperProps {}

const NavigatorWrapper: React.FC<NavigatorWrapperProps> = (props) => {
  const downSampleFactor = useAppSelector(
    (state) => state.globalSettings.navigatorDownSampleFactor,
  );
  const { data: densities } = layoutApi.useGetDensitiesQuery({
    down_sample_factor: downSampleFactor,
  });

  return densities ? (
    <Navigator
      data={densities.densities.map((v, i) => ({ x: i, y: v }))}
      downSampleFactor={densities.down_sample_factor}
    />
  ) : (
    <SpinnerAnnotated message='Loading density navigator' />
  );
};

export default NavigatorWrapper;
