import { useState } from 'react';
import { Button } from 'react-bootstrap';
import gfaApi from '../../../api/gfa';
import GraphInfoModal from '../../modals/GraphInfoModal';
import StatTable from '../../StatTable';
import SidebarSection from './SidebarSection';

interface GraphInfoSidebarSectionProps {}

const GraphInfoSidebarSection: React.FC<GraphInfoSidebarSectionProps> = (props) => {
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <SidebarSection title='Graph information'>
      <StatTable
        tableEntries={{
          nodes: gfaInfo ? gfaInfo.n_segments.toString() : '-',
          edges: gfaInfo ? gfaInfo.n_links.toString() : '-',
          paths: gfaInfo ? gfaInfo.n_paths.toString() : '-',
        }}
      />
      <Button onClick={() => setShowInfo(true)} size='sm'>
        More graph information
      </Button>
      <GraphInfoModal show={showInfo} onHide={() => setShowInfo(false)} />
    </SidebarSection>
  );
};

export default GraphInfoSidebarSection;
