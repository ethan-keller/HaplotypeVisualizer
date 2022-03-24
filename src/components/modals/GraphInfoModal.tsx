import { Modal } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import BarPlot from '../BarPlot';
import SpinnerAnnotated from '../SpinnerAnnotated';
import StatTable from '../StatTable';

interface GraphInfoModalProps {
  onHide: () => void;
  show: boolean;
}

const GraphInfoModal: React.FC<GraphInfoModalProps> = (props) => {
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const { data: gfaHist } = gfaApi.useGetGfaHistValuesQuery();

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
        {gfaHist ? <BarPlot hist={gfaHist} /> : <SpinnerAnnotated message='Calculating plot' />}
      </Modal.Body>
    </Modal>
  );
};

export default GraphInfoModal;
