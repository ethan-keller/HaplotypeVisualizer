import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import { useAppSelector } from '../../store';
import { GfaFeature } from '../../types/gfa';
import { Position } from '../../types/layout';
import VerticalSpacer from '../VerticalSpacer';

interface BookmarkModalProps {
  onHide: () => void;
  show: boolean;
  elem: GfaFeature;
  elemPosition?: Position;
}

const BookmarkModal: React.FC<BookmarkModalProps> = (props) => {
  const [addBookmark] = bookmarksApi.useAddBookmarkMutation();
  const { data: bookmarks } = bookmarksApi.useGetBookmarksQuery();
  const [comment, setComment] = useState<string>('');
  const viewport = useAppSelector((state) => state.graphLayout.viewport);
  const extent = useAppSelector((state) => state.graphLayout.extent);

  useEffect(() => {
    if (bookmarks && props.elem.name in bookmarks) {
      setComment(bookmarks[props.elem.name].comment);
    }
  }, [bookmarks, props.elem.name]);

  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>
          Bookmark <b>{props.elem.name}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          Type: <em>{props.elem.type}</em>
        </Form.Label>
        <br />
        <Form.Label>Comment</Form.Label>
        <InputGroup>
          <Form.Control
            style={{ height: 100, resize: 'none' }}
            placeholder='your comment'
            as='textarea'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </InputGroup>
        <VerticalSpacer space={15} />
        <Button
          onClick={() => {
            addBookmark({
              elem_id: props.elem.name,
              elem_type: props.elem.type,
              elem_pos: props.elemPosition,
              comment: comment,
              viewport: {
                lu: { x: extent.xl, y: viewport.lu.y },
                rd: { x: extent.xr, y: viewport.rd.y },
              },
            });
            props.onHide();
          }}
          size='sm'
          disabled={comment.length > 100}
        >
          Add bookmark
        </Button>
        {bookmarks && props.elem.name in bookmarks ? (
          <>
            {' '}
            <Form.Label style={{ color: 'red' }}>
              This bookmark will overwrite the current one!
            </Form.Label>
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default BookmarkModal;
