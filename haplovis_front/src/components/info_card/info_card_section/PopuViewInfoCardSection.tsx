import { Card } from 'react-bootstrap';
import { GfaFeature } from '../../../types/gfa';
import PathInfoCardSection from './PathInfoCardSection';

interface PopuViewInfoCardSectionProps {
  feature: GfaFeature;
}

const PopuViewInfoCardSection: React.FC<PopuViewInfoCardSectionProps> = (props) => {
  return (
    <>
      <Card.Subtitle className='mb-2 text-muted'>Paths</Card.Subtitle>
      <Card.Text>
        <b>{props.feature.paths.length}</b> paths through this {props.feature.type}
      </Card.Text>
      <PathInfoCardSection feature={props.feature} />
    </>
  );
};

export default PopuViewInfoCardSection;
