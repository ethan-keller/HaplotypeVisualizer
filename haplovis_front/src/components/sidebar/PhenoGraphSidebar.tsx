import DrawLabelsCheck from '../check/DrawLabelsCheck';
import RangeLinkThicknessWithLabel from '../range/with_label/RangeLinkThicknessWithLabel';
import RangeSegmentThicknessWithLabel from '../range/with_label/RangeSegmentThicknessWithLabel';
import Sidebar from './Sidebar';
import GraphInfoSidebarSection from './sidebar_section/GraphInfoSidebarSection';
import PhenoFilterSidebarSection from './sidebar_section/PhenoFilterSidebarSection';
import PhenoIsolationSidebarSection from './sidebar_section/PhenoIsolationSidebarSection';
import PhenoStatsSidebarSection from './sidebar_section/PhenoStatsSidebarSection';
import SidebarSection from './sidebar_section/SidebarSection';

interface PhenoGraphSidebarProps {}

const PhenoGraphSidebar: React.FC<PhenoGraphSidebarProps> = (props) => {
  return (
    <Sidebar title='Phenotype Graph'>
      <GraphInfoSidebarSection />
      <PhenoStatsSidebarSection />
      <SidebarSection title='Styling options'>
        <DrawLabelsCheck />
        <RangeSegmentThicknessWithLabel title='Segment thickness' />
        <RangeLinkThicknessWithLabel title='Link thickness' />
      </SidebarSection>
      <PhenoFilterSidebarSection />
      <PhenoIsolationSidebarSection />
    </Sidebar>
  );
};

export default PhenoGraphSidebar;
