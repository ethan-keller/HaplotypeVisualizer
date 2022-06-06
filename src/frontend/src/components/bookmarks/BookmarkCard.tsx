import { useState } from 'react';
import { Card, Button, CloseButton } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import { Bookmark } from '../../types/bookmark';
import ConfirmationModal from '../modals/ConfirmationModal';
import FeatureInfoModal from '../modals/FeatureInfoModal';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [removeBookMark] = bookmarksApi.useRemoveBookmarkMutation();
  const [featureId, setFeatureId] = useState<string | undefined>(undefined);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{bookmark.elem_id}</Card.Title>
          <Card.Text style={{ opacity: 0.6 }}>{bookmark.comment}</Card.Text>
          <Button size='sm' variant='secondary' onClick={() => setFeatureId(bookmark.elem_id)}>
            Info
          </Button>{' '}
          <CloseButton
            style={{ position: 'absolute', right: 0, top: 0, padding: 16 }}
            onClick={() => setShowConfirmation(true)}
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
      <ConfirmationModal
        title={'Delete bookmark ' + bookmark.elem_id}
        description={
          'Are you sure you want to delete the bookmark for element: ' + bookmark.elem_id + '?'
        }
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        confirmText='Delete'
        confirmButtonVariant='danger'
        onConfirm={() => removeBookMark({ elem_id: bookmark.elem_id })}
      />
    </>
  );
};

export default BookmarkCard;
