import { Modal } from 'react-bootstrap';
import SearchSelect from '../select/SearchSelect';
import VerticalSpacer from '../VerticalSpacer';

interface SearchModalProps {
  onHide: () => void;
  show: boolean;
}

const SearchModal: React.FC<SearchModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Search an element</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select an element to view it in the graph</p>
        <VerticalSpacer space={20} />
        <SearchSelect onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
