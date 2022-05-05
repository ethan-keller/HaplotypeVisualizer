import layoutApi from '../../api/layout';
import { useAppSelector } from '../../store';
import '../../styles/graph.css';
import InfoCard from '../InfoCard';
import SpinnerAnnotated from '../SpinnerAnnotated';
import GraphComponent from './Graph';

interface GraphWrapperProps {}

const GraphWrapper: React.FC<GraphWrapperProps> = (props) => {
  const viewport = useAppSelector((state) => state.graphLayout.viewport);
  const { data: layout } = layoutApi.useGetRangeLayoutNodesQuery(viewport);
  const f = useAppSelector((state) => state.graphSelection.feature);

  return layout ? (
    <>
      {f ? <InfoCard feature={f} showPheno/> : null}
      <GraphComponent layout={layout} />
    </>
  ) : (
    <SpinnerAnnotated message='Loading layout' />
  );
};

export default GraphWrapper;
