import { Card } from 'react-bootstrap';
import { GfaFeature } from '../../../types/gfa';
import PhenotypesInfoCardSection from './PhenotypesInfoCardSection';

interface PhenoGraphInfoCardSectionProps {
  feature: GfaFeature;
}

const PhenoGraphInfoCardSection: React.FC<PhenoGraphInfoCardSectionProps> = (props) => {
  return (
    <>
      <Card.Subtitle className='mb-2 text-muted'>Phenotypes</Card.Subtitle>
      <PhenotypesInfoCardSection feature={props.feature} />
    </>
  );
};

export default PhenoGraphInfoCardSection;
