import { Modal } from 'react-bootstrap';
import SearchSelect from '../select/SearchSelect';

interface SearchModalProps {
  onHide: () => void;
  show: boolean;
}

const SearchModal: React.FC<SearchModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Element search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select an element to view it in the graph</p>
        <SearchSelect onHide={props.onHide} />
        <p style={{ color: 'orange' }}>Feature under development</p>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
