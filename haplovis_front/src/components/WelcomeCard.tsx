import { Card } from 'react-bootstrap';
import VisualizeButton from './file_table/VisualizeButton';
import FileTable from './file_table/FileTable';

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

      <Card.Footer className='text-muted'>v{process.env.REACT_APP_VERSION}</Card.Footer>
    </Card>
  );
};

export default WelcomeCard;