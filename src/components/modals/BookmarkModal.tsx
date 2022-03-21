import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import VerticalSpacer from '../VerticalSpacer';

interface BookmarkModalProps {
  onHide: () => void;
  show: boolean;
  elemId: string;
}

const BookmarkModal: React.FC<BookmarkModalProps> = (props) => {
  const [addBookmark] = bookmarksApi.useAddBookmarkMutation();
  const [description, setDescription] = useState<string>('');
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>
          Bookmark <b>{props.elemId}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* //TODO: add description of element */}
        <Form.Label>
          Description <em>({description.length}/100 characters)</em>
        </Form.Label>
        <InputGroup>
          <Form.Control
            style={{ height: 100, resize: 'none' }}
            isInvalid={description.length > 100}
            placeholder='max. 100 characters'
            maxLength={120}
            as='textarea'
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>
        <VerticalSpacer space={15} />
        <Button
          onClick={() => {
            addBookmark({ elem_id: props.elemId, description: description });
            props.onHide();
          }}
          size='sm'
          disabled={description.length > 100}
        >
          Add bookmark
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default BookmarkModal;
