import { Button, Card } from 'react-bootstrap';

interface ErrorCardProps {
  message: string;
  actionTitle?: string;
  action?: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message, actionTitle, action }) => {
  return (
    <>
      <Card className='bg-warning text-center'>
        <Card.Body>
          <Card.Text>{message}</Card.Text>
          {action && actionTitle ? (
            <Button size='sm' onClick={() => action()}>
              {actionTitle}
            </Button>
          ) : null}
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default ErrorCard;
