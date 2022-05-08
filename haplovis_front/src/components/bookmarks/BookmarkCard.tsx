import { useState } from 'react';
import { Card, Button, CloseButton } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import FeatureInfoModal from '../modals/FeatureInfoModal';

interface BookmarkCardProps {
  elemId: string;
  comment: string;
}

const BookmarkCard: React.FC<BookmarkCardProps> = (props) => {
  const [removeBookMark] = bookmarksApi.useRemoveBookmarkMutation();
  const [featureId, setFeatureId] = useState<string | undefined>(undefined);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.elemId}</Card.Title>
        <Card.Text style={{ opacity: 0.6 }}>{props.comment}</Card.Text>
        <Button size='sm'>Show in graph</Button>{' '}
        <Button size='sm' variant='secondary' onClick={() => setFeatureId(props.elemId)}>
          Info
        </Button>{' '}
        <CloseButton
          style={{ position: 'absolute', right: 0, top: 0, padding: 16 }}
          onClick={() => removeBookMark({ elem_id: props.elemId })}
        />
      </Card.Body>
      {featureId ? (
        <FeatureInfoModal
          show={featureId !== undefined}
          onHide={() => setFeatureId(undefined)}
          elementId={featureId}
        />
      ) : null}
    </Card>
  );
};

export default BookmarkCard;
