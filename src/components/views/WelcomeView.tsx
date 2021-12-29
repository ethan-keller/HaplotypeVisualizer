//@ts-ignore
import pkg from '../../../package.json';
import { Card, Button } from 'react-bootstrap';
import UploadTable from '../UploadTable';
import { url as urlPopulationView } from './PopulationView';

interface WelcomeViewProps {}

const WelcomeView: React.FC<WelcomeViewProps> = (props) => {
  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <Card className='text-center'>
        <Card.Header style={{ width: '75vw' }} className='text-muted'>
          Haplotype Visualizer
        </Card.Header>
        <Card.Body>
          <Card.Title>Welcome!</Card.Title>
          <Card.Text>Upload the necessary files to start visualizing</Card.Text>
          <UploadTable />
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
