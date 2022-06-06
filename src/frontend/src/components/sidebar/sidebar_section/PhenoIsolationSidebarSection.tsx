import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { clearIsolate } from '../../../slices/pheno';
import { useAppDispatch, useAppSelector } from '../../../store';
import ConfirmationModal from '../../modals/ConfirmationModal';
import IsolatePhenoFeatureModal from '../../modals/IsolatePhenoFeatureModal';
import SidebarSection from './SidebarSection';

interface PhenoIsolationSidebarSectionProps {}

const PhenoIsolationSidebarSection: React.FC<PhenoIsolationSidebarSectionProps> = (props) => {
  const [showIsolatePhenoFeature, setShowIsolatePhenoFeature] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
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
        onClick={() => setShowConfirmation(true)}
      >
        Clear
      </Button>
      <IsolatePhenoFeatureModal
        show={showIsolatePhenoFeature}
        onHide={() => setShowIsolatePhenoFeature(false)}
      />
      <ConfirmationModal
        title='Clear phenotype visualization'
        description='Are you sure you want to clear the phenotype visualization?'
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        confirmText='Clear'
        confirmButtonVariant='danger'
        onConfirm={() => dispatch(clearIsolate())}
      />
    </SidebarSection>
  );
};

export default PhenoIsolationSidebarSection;
