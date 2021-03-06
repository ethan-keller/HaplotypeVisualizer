import { Card, Spinner } from 'react-bootstrap';

interface SpinnerAnnotatedProps {
  message: string;
  style?: React.CSSProperties;
}

const SpinnerAnnotated: React.FC<SpinnerAnnotatedProps> = (props) => {
  return (
    <>
      <Card className='text-center' style={{ width: '100%', height: '100%', ...props.style}}>
        <Card.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Body>
            <Card.Text>{props.message}</Card.Text>
            <Spinner animation='border' />
          </Card.Body>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default SpinnerAnnotated;
