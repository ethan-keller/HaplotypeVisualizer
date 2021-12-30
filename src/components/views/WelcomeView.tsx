//@ts-ignore
import pkg from '../../../package.json';
import { Button, Card } from 'react-bootstrap';
import UploadTable from '../UploadTable';
import { url as urlPopulationView } from './PopulationView';
import React, { useState } from 'react';
import FileCommunication from '../../server_communication/FileCommunication';
import { useNavigate } from 'react-router';

interface WelcomeViewProps {}

const WelcomeView: React.FC<WelcomeViewProps> = (props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigate = useNavigate()

  // Only redirect if files are ready for visualization
  const handleStartVisualize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    FileCommunication.prepareFiles().then(
      (response: boolean) => {
        if (response) navigate(urlPopulationView);
        else console.log("Files are not ready for visualization")
      },
      (err: Error) => {
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
          <Button
            variant='primary'
            disabled={!isReady}
            onClick={handleStartVisualize}
            href={urlPopulationView}
          >
            Visualize
          </Button>
        </Card.Body>
        <Card.Footer className='text-muted'>v{pkg.version}</Card.Footer>
      </Card>
    </div>
  );
};

export const url = '/welcome';
export default WelcomeView;
