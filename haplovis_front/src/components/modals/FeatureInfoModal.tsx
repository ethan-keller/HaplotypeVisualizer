import { Card, Modal, Table } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { getSegmentLength } from '../../types/gfa';
import { capitalizeFirstLetter, truncateIfLongerThan } from '../../utils/strings';
import PhenoGraphInfoCardSection from '../info_card/info_card_section/PhenoGraphInfoCardSection';
import PopuViewInfoCardSection from '../info_card/info_card_section/PopuViewInfoCardSection';
import VerticalSpacer from '../VerticalSpacer';

interface FeatureInfoModalProps {
  elementId: string;
  show: boolean;
  onHide: () => void;
}

const FeatureInfoModal: React.FC<FeatureInfoModalProps> = (props) => {
  const { data: feature } = gfaApi.useGetSegmentQuery({ segment_id: props.elementId });
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Element info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {feature ? (
          <Card border='none'>
            <Card.Header style={{ width: 'auto' }}>
              <Card.Title>{feature.name}</Card.Title>
              <Card.Subtitle className='text-muted'>
                {capitalizeFirstLetter(feature.type)}
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              {feature.type === 'segment' ? (
                <>
                  <Card.Text style={{ fontWeight: 100 }}>
                    {'length: ' + getSegmentLength(feature)}
                    <br />
                    {'sequence: ' + truncateIfLongerThan(feature.sequence, 20)}
                  </Card.Text>
                </>
              ) : null}
              <PopuViewInfoCardSection feature={feature} />

              <VerticalSpacer space={30} />

              <PhenoGraphInfoCardSection feature={feature} />

              <VerticalSpacer space={10} />

              {feature.optionals ? (
                <Table className='align-middle'>
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(feature.optionals).map(([k, v], i) => (
                      <tr key={'tag_entry_' + i}>
                        <td>{k}</td>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
            </Card.Body>
          </Card>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default FeatureInfoModal;
