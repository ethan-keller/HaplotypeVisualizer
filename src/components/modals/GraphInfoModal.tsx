import { Modal, Table } from 'react-bootstrap';
import gfaApi from '../../api/gfa';

interface GraphInfoModalProps {
  onHide: () => void;
}

const GraphInfoModal: React.FC<GraphInfoModalProps> = (props) => {
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  return (
    <Modal onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Graph Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table style={{ fontWeight: 100 }} borderless size='sm'>
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
      </Modal.Body>
    </Modal>
  );
};

export default GraphInfoModal;
