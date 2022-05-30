import { useAppSelector } from '../../store';
import NavigatorDownSampleSelect from '../select/NavigatorDownSampleSelect';

interface NavigatorCompressionSettingProps {}

const NavigatorCompressionSetting: React.FC<NavigatorCompressionSettingProps> = (props) => {
  const downSampleFactor = useAppSelector(
    (state) => state.globalSettings.navigatorDownSampleFactor,
  );
  return (
    <>
      <td>
        Navigator compression factor: <b>{downSampleFactor ?? 'auto'}</b>
      </td>
      <td className='col-5'>
        <NavigatorDownSampleSelect />
      </td>
    </>
  );
};

export default NavigatorCompressionSetting;
