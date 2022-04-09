import { Button, Offcanvas } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';
import BookmarkCard from './BookmarkCard';

interface BookmarksOffcanvasProps {
  onHide: () => void;
  show: boolean;
}

const BookmarksOffcanvas: React.FC<BookmarksOffcanvasProps> = (props) => {
  const { data: bookmarks } = bookmarksApi.useGetBookmarksQuery();
  const [removeAllBookmarks] = bookmarksApi.useRemoveAllBookmarksMutation();

  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Bookmarks</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Button
          variant='danger'
          disabled={bookmarks === undefined || Object.keys(bookmarks).length === 0}
          onClick={() => removeAllBookmarks()}
        >
          Clear all
        </Button>
        <VerticalSpacer space={20} />
        {bookmarks ? (
          Object.keys(bookmarks).length === 0 ? (
            'No bookmarks.'
          ) : (
            Object.values(bookmarks).map((bookmark) => (
              <>
                <BookmarkCard elemId={bookmark.elem_id} comment={bookmark.comment} />
                <VerticalSpacer space={10} />
              </>
            ))
          )
        ) : (
          <SpinnerAnnotated message='Loading bookmarks' />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BookmarksOffcanvas;
