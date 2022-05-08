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

interface VisualizeButtonProps {}

const VisualizeButton: React.FC<VisualizeButtonProps> = (props) => {
  const navigate = useNavigate();
  const [prepareFiles, { isLoading: isPreparing }] = filesApi.usePrepareFilesMutation();
  const { data: ready = false } = filesApi.useAreFilesReadyQuery();
  const dispatch = useAppDispatch();
  const globalSettings = useAppSelector((state) => state.globalSettings);

  const handleStartVisualize = (event: React.MouseEvent<HTMLButtonElement>) => {
    // prevent default click behaviour
    event.preventDefault();

    // reset settings
    dispatch(resetGraphSelection());
    dispatch(resetGraphLayout());
    dispatch(resetGraphSettings());

    // set default settings
    dispatch(updateDrawPaths(globalSettings.defaultDrawPaths));
    dispatch(updateDrawLabels(globalSettings.defaultDrawLabels));
    dispatch(updateSegmentThickness(globalSettings.defaultSegmentThickness));
    dispatch(updateLinkThickness(globalSettings.defaultLinkThickness));

    prepareFiles()
      .unwrap()
      .then(() => {
        navigate(urlPopulationView);
      })
      .catch((err) => {
        alert('Files did not prepare correctly on server.');
      });
  };

  return (
    <Button variant='primary' disabled={!ready} onClick={handleStartVisualize}>
      Visualize {isPreparing ? <Spinner className='spinner' animation='border' /> : null}
    </Button>
  );
};

export default VisualizeButton;
