import { Modal, Table } from 'react-bootstrap';
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
  const floatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <Modal onHide={props.onHide} show={props.show} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Graph Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table borderless size='sm'>
          <tbody>
            <tr>
              <td style={{ width: '50%' }}>
                <StatTable
                  tableEntries={
                    gfaInfo
                      ? {
                          nodes: gfaInfo.n_segments.toLocaleString('en-NL'),
                          edges: gfaInfo.n_links.toLocaleString('en-NL'),
                          paths: gfaInfo.n_paths.toLocaleString('en-NL'),
                          'total length': gfaInfo.total_length.toLocaleString('en-NL') + ' bp',
                          'longest node': gfaInfo.longest_segment.toLocaleString('en-NL') + ' bp',
                          'shortest node': gfaInfo.shortest_segment.toLocaleString('en-NL') + ' bp',
                        }
                      : {
                          nodes: '-',
                          edges: '-',
                          paths: '-',
                          'total length': '-',
                          'longest node': '-',
                          'shortest node': '-',
                        }
                  }
                />
              </td>
              <td style={{ width: '50%' }}>
                <StatTable
                  tableEntries={
                    gfaInfo
                      ? {
                          'median node length':
                            gfaInfo.median_segment.toLocaleString('en-NL', floatOptions) + ' bp',
                          'mean node length':
                            gfaInfo.mean_segment.toLocaleString('en-NL', floatOptions) + ' bp',
                          'std node length': gfaInfo.std_dev.toLocaleString('en-NL') + ' bp',
                          // N50: gfaInfo.n50.toLocaleString('en-NL', floatOptions) + ' bp',
                        }
                      : {
                          'median node length': '-',
                          'mean node length': '-',
                          'std node length': '-',
                          // N50: '-',
                        }
                  }
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h6 style={{ textAlign: 'center' }}>Segment length histogram</h6>
        {segmentLengths ? (
          <div style={{ width: '60%', margin: 'auto' }}>
            <Histogram values={segmentLengths} />
          </div>
        ) : (
          <SpinnerAnnotated message='Calculating plot' />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GraphInfoModal;
