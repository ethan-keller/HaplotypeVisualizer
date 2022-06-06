import { Button, Spinner } from 'react-bootstrap';
import filesApi from '../../api/files';
import { url as urlPopulationView } from '../../views/PopulationView';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store';
import { reset as resetGraphLayout } from '../../slices/graphLayout';
import { reset as resetGraphSelection } from '../../slices/graphSelection';
import {
  reset as resetGraphSettings,
  updateDrawLabels,
  updateDrawPaths,
  updateLinkThickness,
  updateSegmentThickness,
} from '../../slices/graphSettings';
import { useState } from 'react';
import AlertModal from '../modals/AlertModal';
import ConfirmationModal from '../modals/ConfirmationModal';

interface VisualizeButtonProps {}

const VisualizeButton: React.FC<VisualizeButtonProps> = (props) => {
  const navigate = useNavigate();
  const [prepareFiles, { isLoading: isPreparing }] = filesApi.usePrepareFilesMutation();
  const { data: ready = false } = filesApi.useAreFilesReadyQuery();
  const [matchGfaPheno, { isLoading: isMatching }] = filesApi.useMatchGfaPhenoMutation();
  const dispatch = useAppDispatch();
  const globalSettings = useAppSelector((state) => state.globalSettings);
  const [showFailedPreparation, setShowFailedPreparation] = useState<boolean>(false);
  const [showFailedMatch, setShowFailedMatch] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleStartVisualize = (event?: React.MouseEvent<HTMLButtonElement>) => {
    // prevent default click behaviour
    if (event) {
      event.preventDefault();
    }

    prepareFiles()
      .unwrap()
      .then(() => {
        matchGfaPheno()
          .unwrap()
          .then((match) => {
            if (match) {
              navigate(urlPopulationView);
            } else {
              setShowFailedMatch(true);
            }
          })
          .catch(() => {
            setShowFailedMatch(true);
          });
      })
      .catch(() => {
        setShowFailedPreparation(true);
      });

    // reset settings
    dispatch(resetGraphSelection());
    dispatch(resetGraphLayout());
    dispatch(resetGraphSettings());

    // set default settings
    dispatch(updateDrawPaths(globalSettings.defaultDrawPaths));
    dispatch(updateDrawLabels(globalSettings.defaultDrawLabels));
    dispatch(updateSegmentThickness(globalSettings.defaultSegmentThickness));
    dispatch(updateLinkThickness(globalSettings.defaultLinkThickness));
  };

  return (
    <>
      <Button variant='primary' disabled={!ready} onClick={() => setShowConfirmation(true)}>
        Visualize{' '}
        {isPreparing || isMatching ? <Spinner className='spinner' animation='border' /> : null}
      </Button>
      <AlertModal
        title='Failed file preparation'
        description='Files did not prepare correctly on server'
        secondaryDescription='Please try again'
        show={showFailedPreparation}
        onHide={() => setShowFailedPreparation(false)}
      />
      <AlertModal
        title='Failed file matching'
        description='The gfa file and phenotype table do not match'
        secondaryDescription='Please import matching files'
        show={showFailedMatch}
        onHide={() => setShowFailedMatch(false)}
      />
      <ConfirmationModal
        title='Visualize'
        description='Ready to visualize?'
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        confirmText='Yes, visualize'
        onConfirm={handleStartVisualize}
      />
    </>
  );
};

export default VisualizeButton;
