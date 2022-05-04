import { Modal } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import Histogram from '../Histogram';
import SpinnerAnnotated from '../SpinnerAnnotated';
import StatTable from '../StatTable';

interface GraphInfoModalProps {
  onHide: () => void;
  show: boolean;
}

const GraphInfoModal: React.FC<GraphInfoModalProps> = (props) => {
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const { data: segmentLengths } = gfaApi.useGetGfaSegmentLengthsQuery();

  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Graph Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StatTable
          tableEntries={{
            nodes: gfaInfo ? gfaInfo.n_segments.toString() : '-',
            edges: gfaInfo ? gfaInfo.n_links.toString() : '-',
            paths: gfaInfo ? gfaInfo.n_paths.toString() : '-',
          }}
        />
        <h6 style={{ textAlign: 'center' }}>Segment length histogram</h6>
        {segmentLengths ? (
          <Histogram values={segmentLengths} />
        ) : (
          <SpinnerAnnotated message='Calculating plot' />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GraphInfoModal;
