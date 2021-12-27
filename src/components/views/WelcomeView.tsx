//@ts-ignore
import pkg from '../../../package.json';
import { Card, Button } from 'react-bootstrap';
import UploadTable from '../UploadTable';
import { useEffect, useState } from 'react';
import { url as urlPopulationView } from './PopulationView';
import { UploadFile } from '../../models/files';
import FileCommunication from '../../communication/FileCommunication';

interface WelcomeViewProps {}

const WelcomeView: React.FC<WelcomeViewProps> = (props) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  // will execute on mount and unmount
  useEffect(() => {
    FileCommunication.getFiles().then(
      (result: UploadFile[]) => {
        setIsLoaded(true);
        setUploadFiles(result);
      },
      (error: Error) => {
        setIsLoaded(true);
        setError(error);
      },
    );
  }, []);

  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <Card className='text-center'>
        <Card.Header style={{ width: '75vw' }} className='text-muted'>
          Haplotype Visualizer
        </Card.Header>
        <Card.Body>
          <Card.Title>Welcome!</Card.Title>
          <Card.Text>Upload the necessary files to start visualizing</Card.Text>
          <UploadTable uploadFiles={!error ? uploadFiles : []} />
          <Button
            variant='primary'
            disabled={true}
            href={urlPopulationView}
            // onClick={() => GFAManager.prepareGFA()}
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
