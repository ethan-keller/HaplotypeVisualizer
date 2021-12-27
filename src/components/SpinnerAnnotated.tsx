import { Card, Spinner } from 'react-bootstrap';

interface SpinnerAnnotatedProps {
  message: string;
}

const SpinnerAnnotated: React.FC<SpinnerAnnotatedProps> = (props) => {
  return (
    <>
      <Card className='text-center'>
        <Card.Body>
          <Card.Text>{props.message}</Card.Text>
          <Spinner animation='border' />
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default SpinnerAnnotated;
