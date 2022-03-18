import { Modal, Table } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import BarPlot from '../BarPlot';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface GraphInfoModalProps {
  onHide: () => void;
}

const GraphInfoModal: React.FC<GraphInfoModalProps> = (props) => {
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const { data: gfaHist } = gfaApi.useGetGfaHistValuesQuery();

  return (
    <Modal onHide={props.onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>Graph Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table style={{ fontWeight: 100 }} size='sm'>
          <tbody>
            <tr>
              <td>Nodes</td>
              <td>{gfaInfo ? gfaInfo.n_segments : '-'}</td>
            </tr>
            <tr>
              <td>Edges</td>
              <td>{gfaInfo ? gfaInfo.n_links : '-'}</td>
            </tr>
            <tr>
              <td>Paths</td>
              <td>{gfaInfo ? gfaInfo.n_paths : '-'}</td>
            </tr>
          </tbody>
        </Table>
        <h6 style={{ textAlign: 'center' }}>Segment length histogram</h6>
        {gfaHist ? <BarPlot hist={gfaHist} /> : <SpinnerAnnotated message='Calculating plot' />}
      </Modal.Body>
    </Modal>
  );
};

export default GraphInfoModal;
