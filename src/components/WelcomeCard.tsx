import { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import FileCommunication from '../server_communication/FileCommunication';
import UploadTable from './UploadTable';
import { url as urlPopulationView } from '../views/PopulationView';
// @ts-ignore
import pkg from '../../package.json';

interface WelcomeCardProps {
  description: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = (props) => {
  // state: are required files uploaded and ready for visualization?
  const [isReady, setIsReady] = useState<boolean>(false);

  // state: are uploaded files prepared on the server?
  const [isPrepared, setIsPrepared] = useState<boolean>(true);

  // hook to navigate to another view
  const navigate = useNavigate();

  // handle the visualization start click
  const handleStartVisualize = (event: React.MouseEvent<HTMLButtonElement>) => {
    // prevent default click behaviour
    event.preventDefault();

    // change state for spinner to appear
    setIsPrepared(false);

    // call api to prepare files
    apiPrepareFiles();
  };

  const apiPrepareFiles = () => {
    FileCommunication.prepareFiles().then(
      (response: boolean) => {
        setIsPrepared(true);

        // only redirect if files are ready for visualization
        if (response) navigate(urlPopulationView);
        else console.log('Files are not ready for visualization');
      },
      (err: Error) => {
        setIsPrepared(true);
        console.log(err);
      },
    );
  };

  return (
    <Card className='text-center'>
      <Card.Header className='card-header text-muted'>Haplotype Visualizer</Card.Header>

      <Card.Body>
        <Card.Title>Welcome!</Card.Title>
        <Card.Text>{props.description}</Card.Text>

        <UploadTable setIsReady={setIsReady} />

        <Button variant='primary' disabled={!isReady} onClick={handleStartVisualize}>
          Visualize {!isPrepared && <Spinner className='spinner' animation='border' />}
        </Button>
      </Card.Body>

      <Card.Footer className='text-muted'>v{pkg.version}</Card.Footer>
    </Card>
  );
};

export default WelcomeCard;
