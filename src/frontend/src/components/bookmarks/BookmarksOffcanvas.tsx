import { Button, Offcanvas } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';
import BookmarkCard from './BookmarkCard';
import { BsDownload } from 'react-icons/bs';
import { useState } from 'react';
import ExportBookmarksModal from '../modals/ExportBookmarksModal';
import { useNavigate } from 'react-router';
import { url as urlWelcomeView } from '../../views/WelcomeView';
import ConfirmationModal from '../modals/ConfirmationModal';

interface BookmarksOffcanvasProps {
  onHide: () => void;
  show: boolean;
}

const BookmarksOffcanvas: React.FC<BookmarksOffcanvasProps> = (props) => {
  const { data: bookmarks } = bookmarksApi.useGetBookmarksQuery();
  const [exportBookmarks, { data: filePath, isLoading, isError }] =
    bookmarksApi.useExportBookmarksMutation();
  const [showExportBookmarks, setShowExportBookmarks] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Bookmarks</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Button
          onClick={() => {
            setShowConfirmation(true);
          }}
          disabled={
            bookmarks === undefined || bookmarks === null || Object.keys(bookmarks).length === 0
          }
          variant='warning'
        >
          Export bookmarks
          <BsDownload style={{ marginLeft: 10 }} />
        </Button>
        <VerticalSpacer space={15} />
        {bookmarks ? (
          Object.keys(bookmarks).length === 0 ? (
            <>
              <div>No bookmarks.</div>
              <Button
                style={{ marginTop: 10 }}
                size='sm'
                onClick={() => {
                  props.onHide();
                  navigate(urlWelcomeView, { state: { highlightBookmarksRow: true } });
                }}
              >
                import bookmarks
              </Button>
            </>
          ) : (
            Object.values(bookmarks).map((bookmark, i) => (
              <div key={i}>
                <BookmarkCard bookmark={bookmark} />
                <VerticalSpacer space={10} />
              </div>
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
      <ConfirmationModal
        title='Export bookmarks'
        description='Are you sure you want to export your bookmarks ?'
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        confirmText='Export'
        confirmButtonVariant='warning'
        onConfirm={() => {
          setShowExportBookmarks(true);
          exportBookmarks();
        }}
      />
    </Offcanvas>
  );
};

export default BookmarksOffcanvas;
