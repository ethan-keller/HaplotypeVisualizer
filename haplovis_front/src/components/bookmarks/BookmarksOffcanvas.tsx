import { Button, Offcanvas } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';
import BookmarkCard from './BookmarkCard';
import { BsDownload } from 'react-icons/bs';
import { useState } from 'react';
import ExportBookmarksModal from '../modals/ExportBookmarksModal';

interface BookmarksOffcanvasProps {
  onHide: () => void;
  show: boolean;
}

const BookmarksOffcanvas: React.FC<BookmarksOffcanvasProps> = (props) => {
  const { data: bookmarks } = bookmarksApi.useGetBookmarksQuery();
  const [exportBookmarks, { data: filePath, isLoading, isError }] =
    bookmarksApi.useExportBookmarksMutation();
  const [showExportBookmarks, setShowExportBookmarks] = useState<boolean>(false);

  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Bookmarks</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Button
          onClick={() => {
            setShowExportBookmarks(true);
            exportBookmarks();
          }}
          disabled={
            bookmarks === undefined || bookmarks === null || Object.keys(bookmarks).length === 0
          }
          variant='secondary'
        >
          Export bookmarks
          <BsDownload style={{ marginLeft: 10 }} />
        </Button>
        <VerticalSpacer space={15} />
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
      <ExportBookmarksModal
        show={showExportBookmarks}
        onHide={() => setShowExportBookmarks(false)}
        filePath={filePath}
        isError={isError}
        isLoading={isLoading}
      />
    </Offcanvas>
  );
};

export default BookmarksOffcanvas;
