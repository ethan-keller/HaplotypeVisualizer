import { Modal } from 'react-bootstrap';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface ExportBookmarksModalProps {
  show: boolean;
  onHide: () => void;
  filePath?: string;
  isError: boolean;
  isLoading: boolean;
}

const ExportBookmarksModal: React.FC<ExportBookmarksModalProps> = (props) => {
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Export bookmarks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.isLoading ? (
          <>
            {/* <VerticalSpacer space={15} /> */}
            <SpinnerAnnotated style={{ height: '20%' }} message='Exporting bookmarks' />
          </>
        ) : null}
        {props.isError ? (
          <>
            {/* <VerticalSpacer space={15} /> */}
            <ErrorCard message='Could not export bookmarks' />
          </>
        ) : null}
        {props.filePath ? (
          <>
            {/* <VerticalSpacer space={15} /> */}
            <div style={{ color: 'green', wordWrap: 'break-word' }}>exported to: {props.filePath}</div>
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default ExportBookmarksModal;
