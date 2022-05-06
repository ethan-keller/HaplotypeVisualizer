import { Card } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { FeatureSelection } from '../../types/graph';
import SpinnerAnnotated from '../SpinnerAnnotated';
import InfoCard from './InfoCard';
import PhenoGraphInfoCardSection from './info_card_section/PhenoGraphInfoCardSection';

interface PhenoGraphInfoCardProps {
  feature: FeatureSelection;
}

const PhenoGraphInfoCard: React.FC<PhenoGraphInfoCardProps> = (props) => {
  const { data: feature } =
    props.feature.type === 'segment'
      ? gfaApi.useGetSegmentQuery({ segment_id: props.feature.name })
      : gfaApi.useGetLinkQuery({ link_id: props.feature.name });

  return feature ? (
    <InfoCard feature={feature}>
      <Card.Subtitle className='mb-2 text-muted'>Phenotypes</Card.Subtitle>
      <PhenoGraphInfoCardSection feature={feature} />
    </InfoCard>
  ) : null;
};

export default PhenoGraphInfoCard;
