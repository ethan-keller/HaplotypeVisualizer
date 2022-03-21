import { Card, Button } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';

interface BookmarkCardProps {
  elemId: string;
  description: string;
}

const BookmarkCard: React.FC<BookmarkCardProps> = (props) => {
  const [removeBookMark] = bookmarksApi.useRemoveBookmarkMutation();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.elemId}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button size='sm'>Go to element</Button>{' '}
        <Button
          onClick={() => removeBookMark({ elem_id: props.elemId })}
          size='sm'
          variant='danger'
        >
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookmarkCard;
