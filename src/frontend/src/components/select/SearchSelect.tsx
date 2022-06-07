import { useMemo, useState } from 'react';
import Select from 'react-select';
import gfaApi from '../../api/gfa';
import { GfaElementOption } from '../../types/gfa';
import ConfirmationModal from '../modals/ConfirmationModal';

interface SearchSelectProps {
  onHide: () => void;
}

const SearchSelect: React.FC<SearchSelectProps> = (props) => {
  const { data: segment_names } = gfaApi.useGetGfaSegmentNamesQuery();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selection, setSelection] = useState<string | undefined>(undefined);

  const options: GfaElementOption[] | undefined = useMemo(() => {
    if (segment_names) {
      return segment_names.map((name) => ({ value: name, label: name }));
    }
  }, [segment_names]);

  const setNewViewport = (element: string) => {
    // TODO: actually set new viewport
    console.log(element);
  };

  return segment_names ? (
    <>
      <Select<GfaElementOption>
        isSearchable
        isClearable
        closeMenuOnSelect={true}
        closeMenuOnScroll
        isDisabled={segment_names.length === 0}
        onChange={(value) => {
          if (value) {
            setSelection(value.value);
            setShowConfirmation(true);
          } else {
            setSelection(undefined);
          }
        }}
        options={options}
      />
      {selection ? (
        <ConfirmationModal
          title={'Navigate to ' + selection}
          description={'Are you sure you want to navigate to ' + selection + ' in the graph?'}
          show={showConfirmation}
          onHide={() => setShowConfirmation(false)}
          confirmText='Confirm'
          onConfirm={() => {
            setNewViewport(selection);
            props.onHide();
          }}
        />
      ) : null}
    </>
  ) : (
    <Select isDisabled />
  );
};

export default SearchSelect;
