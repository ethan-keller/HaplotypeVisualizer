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
                  nodes: gfaInfo.n_segments.toLocaleString('en-NL'),
                  edges: gfaInfo.n_links.toLocaleString('en-NL'),
                  paths: gfaInfo.n_paths.toLocaleString('en-NL'),
                  'total length': gfaInfo.total_length.toLocaleString('en-NL'),
                  'longest node': gfaInfo.longest_segment.toLocaleString('en-NL'),
                  'shortest node': gfaInfo.shortest_segment.toLocaleString('en-NL'),
                  'median node length': gfaInfo.median_segment.toLocaleString('en-NL'),
                  'mean node length': gfaInfo.mean_segment.toLocaleString('en-NL', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  'std. deviation node length': gfaInfo.std_dev.toLocaleString('en-NL', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  N50: gfaInfo.n50.toLocaleString('en-NL', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
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
