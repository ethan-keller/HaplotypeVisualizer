import { Card } from 'react-bootstrap';
import VisualizeButton from './file_table/VisualizeButton';
import FileTable from './file_table/FileTable';
import ChangeFoldersButton from './ChangeFoldersButton';
import VerticalSpacer from './VerticalSpacer';
import ClearFilesButton from './file_table/ClearFilesButton';

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
        <ChangeFoldersButton />
        <VerticalSpacer space={30} />
        <VisualizeButton /> <ClearFilesButton />
      </Card.Body>
      <Card.Footer className='text-muted'>v{process.env.REACT_APP_VERSION}</Card.Footer>
    </Card>
  );
};

export default WelcomeCard;
