import Header from '../components/Header';
import '../styles/popu-view.css';
import PopulationViewSidebar from '../components/sidebar/PopulationViewSidebar';
import GraphWrapper from '../components/graph/GraphWrapper';
import NavigatorWrapper from '../components/navigator/NavigatorWrapper';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  return (
    <>
      <Header />
      <div className='pp-v-container'>
        <div className='pp-v-sidebar'>
          <PopulationViewSidebar />
        </div>

        <div className='pp-v-graph'>
          <GraphWrapper />
        </div>

        <div className='pp-v-navigator'>
          <NavigatorWrapper />
        </div>
      </div>
    </>
  );
};

export default PopulationView;
export const url = '/population_view';
