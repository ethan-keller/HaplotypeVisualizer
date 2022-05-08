import { useMemo } from 'react';
import Select from 'react-select';
import gfaApi from '../../api/gfa';
import { addSampleFilter } from '../../slices/pheno';
import { useAppDispatch } from '../../store';
import { SampleOption } from '../../types/pheno';

interface SampleFilterSelectProps {}

const SampleFilterSelect: React.FC<SampleFilterSelectProps> = (props) => {
  const dispatch = useAppDispatch();
  const { data: paths } = gfaApi.useGetPathsQuery();
  const options = useMemo(
    () => (paths ? Object.keys(paths).map((path) => ({ value: path, label: path })) : undefined),
    [paths],
  );
  return paths ? (
    <Select<SampleOption, true>
      isSearchable
      isClearable
      isMulti
      closeMenuOnSelect={false}
      closeMenuOnScroll
      onChange={(values) =>
        dispatch(
          addSampleFilter({
            samples: values.map((v) => v.value),
            segments: values.flatMap((v) => paths[v.value].segment_names),
          }),
        )
      }
      options={options}
    />
  ) : (
    <Select isDisabled />
  );
};

export default SampleFilterSelect;
