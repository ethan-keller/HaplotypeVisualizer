//@ts-ignore
import pkg from '../../../package.json';
import { Card, Button } from 'react-bootstrap';
import UploadTable from '../UploadTable';
import FileManager, { UploadFile } from '../../data/FileManager';
import GFAManager from '../../data/GFAManager'
import { useEffect, useState } from 'react';
import { url as urlPopulationView } from './PopulationView';

interface WelcomeViewProps {}

const WelcomeView: React.FC<WelcomeViewProps> = (props) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>(FileManager.getRequestedFiles());

  // will execute on mount and unmount
  useEffect(() => {
    FileManager.subscribe(() => setUploadFiles(FileManager.getRequestedFiles()));
    return () => {
      FileManager.unsubscribe(() => setUploadFiles(FileManager.getRequestedFiles()));
    };
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
          <UploadTable uploadFiles={uploadFiles} />
          <Button
            variant='primary'
            disabled={!FileManager.allRequiredFilesUploaded()}
            href={urlPopulationView}
            onClick={() => GFAManager.prepareGFA()}
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
