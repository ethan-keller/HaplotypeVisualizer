import { Form, FloatingLabel } from 'react-bootstrap';
import phenoApi from '../../api/pheno';
import { addSampleFilter } from '../../slices/pheno';
import { useAppDispatch } from '../../store';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PhenoTableSidebarProps {}

const PhenoTableSidebar: React.FC<PhenoTableSidebarProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const { data: phenosPerSample } = phenoApi.useGetPhenosPerSampleQuery();
  const dispatch = useAppDispatch();

  return (
    <Sidebar title='Phenotype table'>
      <SidebarSection title='Phenotypes'>
        <FloatingLabel label='Select phenotypes'>
          {/* Add multiple select options */}
          <Form.Select size='sm'>
            {phenotypes
              ? Object.keys(phenotypes).map((key, i) => {
                  return <option key={'pheno' + i}>{key}</option>;
                })
              : null}
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>

      <SidebarSection title='Samples'>
        <FloatingLabel label='Exclude samples'>
          {/* Add multiple select options */}
          <Form.Select size='sm' onChange={(e) => dispatch(addSampleFilter(e.target.value))}>
            {phenosPerSample
              ? Object.keys(phenosPerSample).map((sample, i) => {
                  return <option key={'sample' + i}>{sample}</option>;
                })
              : null}
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>
    </Sidebar>
  );
};

export default PhenoTableSidebar;
