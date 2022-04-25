import { Button, Spinner } from 'react-bootstrap';
import filesApi from '../../api/files';
import { url as urlPopulationView } from '../../views/PopulationView';
import { useNavigate } from 'react-router';

interface VisualizeButtonProps {
}

const VisualizeButton: React.FC<VisualizeButtonProps> = (props) => {
  const navigate = useNavigate();
  const [prepareFiles, { isLoading: isPreparing }] = filesApi.usePrepareFilesMutation();
  const { data: ready = false } = filesApi.useAreFilesReadyQuery();

  const handleStartVisualize = (event: React.MouseEvent<HTMLButtonElement>) => {
    // prevent default click behaviour
    event.preventDefault();

    prepareFiles()
      .unwrap()
      .then(() => {
        navigate(urlPopulationView);
      })
      .catch((err) => {
        console.log(err);
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
