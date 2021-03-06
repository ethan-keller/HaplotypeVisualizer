import Select from 'react-select';
import { updateNavigatorDownSampleFactor } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';
interface NavigatorDownSampleSelectProps {}

const options = [
  { value: undefined, label: 'auto' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 32, label: '32' },
  { value: 64, label: '64' },
  { value: 128, label: '128' },
];

const NavigatorDownSampleSelect: React.FC<NavigatorDownSampleSelectProps> = (props) => {
  const dispatch = useAppDispatch();
  const factor = useAppSelector((state) => state.globalSettings.navigatorDownSampleFactor);
  return (
    <Select
      options={options}
      isSearchable
      defaultValue={{ value: factor, label: factor ? factor : 'auto' }}
      onChange={(value) => {
        dispatch(updateNavigatorDownSampleFactor(value?.value));
      }}
    />
  );
};

export default NavigatorDownSampleSelect;
