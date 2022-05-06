import { Card } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { FeatureSelection } from '../../types/graph';
import InfoCard from './InfoCard';
import PopuViewInfoCardSection from './info_card_section/PopuViewInfoCardSection';

interface PopuViewInfoCardProps {
  feature: FeatureSelection;
}

const PopuViewInfoCard: React.FC<PopuViewInfoCardProps> = (props) => {
  const { data: feature } =
    props.feature.type === 'segment'
      ? gfaApi.useGetSegmentQuery({ segment_id: props.feature.name })
      : gfaApi.useGetLinkQuery({ link_id: props.feature.name });

  return feature ? (
    <InfoCard feature={feature}>
      <Card.Subtitle className='mb-2 text-muted'>Paths</Card.Subtitle>
      <Card.Text>
        <b>{feature.paths.length}</b> paths through this {props.feature.type}
      </Card.Text>
      <PopuViewInfoCardSection feature={feature} />
    </InfoCard>
  ) : null;
};

export default PopuViewInfoCard;
