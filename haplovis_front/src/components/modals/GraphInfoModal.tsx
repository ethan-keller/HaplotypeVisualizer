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
          tableEntries={
            gfaInfo
              ? {
                  nodes: gfaInfo.n_segments.toString(),
                  edges: gfaInfo.n_links.toString(),
                  paths: gfaInfo.n_paths.toString(),
                  'longest node': gfaInfo.longest_segment.toString(),
                  'shortest node': gfaInfo.shortest_segment.toString(),
                  'median node length': gfaInfo.median_segment.toString(),
                  'mean node length': gfaInfo.mean_segment.toFixed(2).toString(),
                  'std. deviation node length': gfaInfo.std_dev.toFixed(2).toString(),
                }
              : {
                  nodes: '-',
                  edges: '-',
                  paths: '-',
                  'longest node': '-',
                  'shortest node': '-',
                  'median node length': '-',
                  'mean node length': '-',
                  'std. deviation node length': '-',
                }
          }
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
