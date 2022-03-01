import { Form, FloatingLabel } from 'react-bootstrap';
import phenoApi from '../../api/pheno';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PhenoTableSidebarProps {}

const PhenoTableSidebar: React.FC<PhenoTableSidebarProps> = (props) => {
  const { data: phenoTable } = phenoApi.useGetPhenoTableQuery();

  return (
    <Sidebar title='Phenotype table'>
      <SidebarSection title='Phenotypes'>
        <FloatingLabel label='Select phenotypes'>
          {/* Add multiple select options */}
          <Form.Select size='sm'>
            {phenoTable && phenoTable.phenotypes[0]
              ? Object.keys(phenoTable.phenotypes[0]).map((key, i) => (
                  <option key={'pheno' + i}>{key}</option>
                ))
              : null}
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>

      <SidebarSection title='Samples'>
        <FloatingLabel label='Exclude samples'>
          {/* Add multiple select options */}
          <Form.Select size='sm'>
            {phenoTable
              ? phenoTable.phenotypes.map((record, i) => {
                  return <option key={'sample' + i}>{Object.values(record)[0]}</option>;
                })
              : null}
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>
    </Sidebar>
  );
};

export default PhenoTableSidebar;
