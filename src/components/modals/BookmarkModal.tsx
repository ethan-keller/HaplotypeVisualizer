import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import { GfaFeature } from '../../types/gfa';
import VerticalSpacer from '../VerticalSpacer';

interface BookmarkModalProps {
  onHide: () => void;
  show: boolean;
  elem: GfaFeature;
}

const BookmarkModal: React.FC<BookmarkModalProps> = (props) => {
  const [addBookmark] = bookmarksApi.useAddBookmarkMutation();
  const [comment, setComment] = useState<string>('');
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
        <Form.Label>
          Comment <em>({comment.length}/100 characters)</em>
        </Form.Label>
        <InputGroup>
          <Form.Control
            style={{ height: 100, resize: 'none' }}
            isInvalid={comment.length > 100}
            placeholder='max. 100 characters'
            maxLength={120}
            as='textarea'
            onChange={(e) => setComment(e.target.value)}
          />
        </InputGroup>
        <VerticalSpacer space={15} />
        <Button
          onClick={() => {
            addBookmark({ elem_id: props.elem.name, comment: comment });
            props.onHide();
          }}
          size='sm'
          disabled={comment.length > 100}
        >
          Add bookmark
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default BookmarkModal;
