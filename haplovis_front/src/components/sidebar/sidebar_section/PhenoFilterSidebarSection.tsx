import { Form } from 'react-bootstrap';
import PhenoFilterSelect from '../../select/PhenoFilterSelect';
import SampleFilterSelect from '../../select/SampleFilterSelect';
import VerticalSpacer from '../../VerticalSpacer';
import SidebarSection from './SidebarSection';

interface PhenoFilterSidebarSectionProps {}

const PhenoFilterSidebarSection: React.FC<PhenoFilterSidebarSectionProps> = (props) => {
  return (
    <SidebarSection title='Filters'>
      <Form.Label style={{ fontSize: 14 }}>Phenotypes</Form.Label>
      <PhenoFilterSelect />
      <VerticalSpacer space={10} />
      <Form.Label style={{ fontSize: 14 }}>Samples</Form.Label>
      <SampleFilterSelect />
    </SidebarSection>
  );
};

export default PhenoFilterSidebarSection;
