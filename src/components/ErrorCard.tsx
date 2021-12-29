import { Card } from 'react-bootstrap';

interface ErrorCardProps {
  message: string;
}

const ErrorCard: React.FC<ErrorCardProps> = (props) => {
  return (
    <>
      <Card className='bg-warning text-center'>
        <Card.Body>
          <Card.Text>{props.message}</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default ErrorCard;
