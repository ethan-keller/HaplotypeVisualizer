//@ts-ignore
import pkg from '../../../package.json';
import { Button, Card, Spinner } from 'react-bootstrap';
import UploadTable from './UploadTable';
import { url as urlPopulationView } from '../popuview/PopulationView';
import React, { useState } from 'react';
import FileCommunication from '../../server_communication/FileCommunication';
import { useNavigate } from 'react-router';

interface WelcomeViewProps {}

const WelcomeView: React.FC<WelcomeViewProps> = (props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleStartVisualize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoaded(false);
    FileCommunication.prepareFiles().then(
      (response: boolean) => {
        setIsLoaded(true);
        // only redirect if files are ready for visualization
        if (response) navigate(urlPopulationView);
        else console.log('Files are not ready for visualization');
      },
      (err: Error) => {
        setIsLoaded(true);
        console.log(err);
      },
    );
  };

  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <Card className='text-center'>
        <Card.Header style={{ width: '75vw' }} className='text-muted'>
          Haplotype Visualizer
        </Card.Header>
        <Card.Body>
          <Card.Title>Welcome!</Card.Title>
          <Card.Text>Upload the necessary files to start visualizing</Card.Text>
          <UploadTable setIsReady={setIsReady} />
          <Button variant='primary' disabled={!isReady} onClick={handleStartVisualize}>
            Visualize{' '}
            {isLoaded ? null : (
              <Spinner style={{ width: '1rem', height: '1rem' }} animation='border' />
            )}
          </Button>
        </Card.Body>
        <Card.Footer className='text-muted'>v{pkg.version}</Card.Footer>
      </Card>
    </div>
  );
};

export const url = '/welcome';
export default WelcomeView;
