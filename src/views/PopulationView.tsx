import GraphComponent from '../components/graph/Graph';
import Header from '../components/Header';
import '../styles/popu-view.css';
import PopulationViewSidebar from '../components/sidebar/PopulationViewSidebar';
import SpinnerAnnotated from '../components/SpinnerAnnotated';
import layoutApi from '../api/layout';
import gfaApi from '../api/gfa';
import { useAppSelector } from '../store';
import { cytoscapeEdges, cytoscapeNodes } from '../cytoscape/cytoscape';
import Navigator from '../components/Navigator';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  const { data: layout, isLoading } = layoutApi.useGetLayoutQuery();
  const { data: segments } = gfaApi.useGetSegmentsQuery();
  const { data: links } = gfaApi.useGetLinksQuery();
  const graphSettings = useAppSelector((state) => state.graphSettings);

  let graph;

  if (segments && links) {
    graph = {
      nodes: cytoscapeNodes(segments, graphSettings),
      edges: cytoscapeEdges(links, graphSettings),
    };
  }

  return (
    <>
      <Header />
      <div className='pp-v-container'>
        <div className='pp-v-sidebar'>
          <PopulationViewSidebar />
        </div>

        <div className='pp-v-graph'>
          {isLoading ? (
            <SpinnerAnnotated message='Loading graph' />
          ) : layout && graph && graphSettings ? (
            <GraphComponent graph={graph} settings={graphSettings} layout={layout} />
          ) : null}
        </div>

        <div className='pp-v-navigator'>
          <Navigator />
        </div>
      </div>
    </>
  );
};

export default PopulationView;
export const url = '/population_view';
