import { Button } from 'react-bootstrap';
import {
  initialState as initialGraphSettingsState,
  updateDrawArrows,
} from '../../slices/graphSettings';
import { reset } from '../../slices/globalSettings';
import { useAppDispatch } from '../../store';
import { useState } from 'react';
import ConfirmationModal from '../modals/ConfirmationModal';

interface ResetSettingsButtonProps {}

const ResetSettingsButton: React.FC<ResetSettingsButtonProps> = (props) => {
  const dispatch = useAppDispatch();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  return (
    <>
      <Button size='sm' variant='warning' onClick={() => setShowConfirmation(true)}>
        Reset settings
      </Button>
      <ConfirmationModal
        title='Reset settings'
        description='Are you sure you want to reset all settings'
        secondaryDescription='This will set all settings back to their default values'
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        confirmText='Reset'
        confirmButtonVariant='warning'
        onConfirm={() => {
          dispatch(reset());
          // add additional reset for drawArrows since it is not in the global settings state
          dispatch(updateDrawArrows(initialGraphSettingsState.drawArrows));
        }}
      />
    </>
  );
};

export default ResetSettingsButton;
