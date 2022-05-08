import { useState } from 'react';
import { updateDefaultLinkThickness } from '../../slices/globalSettings';
import { useAppDispatch, useAppSelector } from '../../store';
import RangeLinkThickness from '../range/RangeLinkThickness';

interface LinkThicknessSettingProps {}

const LinkThicknessSetting: React.FC<LinkThicknessSettingProps> = (props) => {
  const linkThickness = useAppSelector((state) => state.globalSettings.defaultLinkThickness);
  const [value, setValue] = useState<number>(linkThickness);
  const dispatch = useAppDispatch();

  return (
    <>
      <td>
        Default link thickness: <b>{value}</b>
      </td>
      <td className='col-5'>
        <RangeLinkThickness
          onChange={(newLinkThickness) => setValue(newLinkThickness)}
          onMousUp={() => dispatch(updateDefaultLinkThickness(value))}
        />
      </td>
    </>
  );
};

export default LinkThicknessSetting;
