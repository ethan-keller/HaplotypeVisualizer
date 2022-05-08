import { useState } from 'react';
import { Card, Button, CloseButton } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import { updateFirstGraphRender, updatePan, updateViewport } from '../../slices/graphLayout';
import { useAppDispatch } from '../../store';
import { Bookmark } from '../../types/bookmark';
import FeatureInfoModal from '../modals/FeatureInfoModal';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
  const [removeBookMark] = bookmarksApi.useRemoveBookmarkMutation();
  const [featureId, setFeatureId] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{bookmark.elem_id}</Card.Title>
        <Card.Text style={{ opacity: 0.6 }}>{bookmark.comment}</Card.Text>
        {/* <Button
          size='sm'
          onClick={() => {
            dispatch(updateViewport(bookmark.viewport));
            // dispatch(updateFirstGraphRender(true));
            dispatch(updatePan({ x: bookmark.viewport.lu.x, y: 0 }));
          }}
        >
          Show in graph
        </Button>{' '} */}
        <Button size='sm' variant='secondary' onClick={() => setFeatureId(bookmark.elem_id)}>
          Info
        </Button>{' '}
        <CloseButton
          style={{ position: 'absolute', right: 0, top: 0, padding: 16 }}
          onClick={() => removeBookMark({ elem_id: bookmark.elem_id })}
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
