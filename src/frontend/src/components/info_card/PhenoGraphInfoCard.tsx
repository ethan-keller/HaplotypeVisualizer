import gfaApi from '../../api/gfa';
import { FeatureSelection } from '../../types/graph';
import InfoCard from './InfoCard';
import PhenoGraphInfoCardSection from './info_card_section/PhenoGraphInfoCardSection';

interface PhenoGraphInfoCardProps {
  feature: FeatureSelection;
  onClose: () => void;
}

const PhenoGraphInfoCard: React.FC<PhenoGraphInfoCardProps> = (props) => {
  const { data: feature } =
    props.feature.type === 'segment'
      ? gfaApi.useGetSegmentQuery({ segment_id: props.feature.name })
      : gfaApi.useGetLinkQuery({ link_id: props.feature.name });

  return feature ? (
    <InfoCard
      elemPosition={props.feature.type === 'segment' ? props.feature.position : undefined}
      feature={feature}
      onClose={props.onClose}
    >
      <PhenoGraphInfoCardSection feature={feature} />
    </InfoCard>
  ) : null;
};

export default PhenoGraphInfoCard;
