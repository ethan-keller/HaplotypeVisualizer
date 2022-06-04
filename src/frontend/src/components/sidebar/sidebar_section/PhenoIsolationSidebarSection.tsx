import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { clearIsolate } from '../../../slices/pheno';
import { useAppDispatch, useAppSelector } from '../../../store';
import IsolatePhenoFeatureModal from '../../modals/IsolatePhenoFeatureModal';
import SidebarSection from './SidebarSection';

interface PhenoIsolationSidebarSectionProps {}

const PhenoIsolationSidebarSection: React.FC<PhenoIsolationSidebarSectionProps> = (props) => {
  const [showIsolatePhenoFeature, setShowIsolatePhenoFeature] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isolate = useAppSelector((state) => state.pheno.isolate);
  return (
    <SidebarSection title='Visualize phenotypes'>
      <Button size='sm' onClick={() => setShowIsolatePhenoFeature(true)} style={{ marginRight: 8 }}>
        Visualize
      </Button>
      <Button
        disabled={!isolate}
        size='sm'
        variant='danger'
        onClick={() => dispatch(clearIsolate())}
      >
        Clear
      </Button>
      <IsolatePhenoFeatureModal
        show={showIsolatePhenoFeature}
        onHide={() => setShowIsolatePhenoFeature(false)}
      />
    </SidebarSection>
  );
};

export default PhenoIsolationSidebarSection;
