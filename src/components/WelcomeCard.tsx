import { Card } from 'react-bootstrap';
// @ts-ignore
import pkg from '../../package.json';
import VisualizeButton from './VisualizeButton';
import FileTable from './FileTable';

interface WelcomeCardProps {
  description: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = (props) => {
  return (
    <Card className='text-center'>
      <Card.Header className='card-header text-muted'>Haplotype Visualizer</Card.Header>

      <Card.Body>
        <Card.Title>Welcome!</Card.Title>
        <Card.Text>{props.description}</Card.Text>

        <FileTable />

        <VisualizeButton />
      </Card.Body>

      <Card.Footer className='text-muted'>v{pkg.version}</Card.Footer>
    </Card>
  );
};

export default WelcomeCard;
