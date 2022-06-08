import gfaApi from '../../api/gfa';
import { FeatureSelection } from '../../types/graph';
import InfoCard from './InfoCard';
import PopuViewInfoCardSection from './info_card_section/PopuViewInfoCardSection';

interface PopuViewInfoCardProps {
  feature: FeatureSelection;
  onClose: () => void;
}

const PopuViewInfoCard: React.FC<PopuViewInfoCardProps> = (props) => {
  const { data: feature } =
    props.feature.type === 'segment'
      ? gfaApi.useGetSegmentQuery({ segment_id: props.feature.name })
      : gfaApi.useGetLinkQuery({ link_id: props.feature.name });

  return feature ? (
    <InfoCard elemPosition={props.feature.type === 'segment' ? props.feature.position : undefined} feature={feature} onClose={props.onClose}>
      <PopuViewInfoCardSection feature={feature} />
    </InfoCard>
  ) : null;
};

export default PopuViewInfoCard;
