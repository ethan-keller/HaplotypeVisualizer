import layoutApi from '../../api/layout';
import { useAppSelector } from '../../store';
import '../../styles/graph.css';
import PhenoGraphInfoCard from '../info_card/PhenoGraphInfoCard';
import PopuViewInfoCard from '../info_card/PopuViewInfoCard';
import SpinnerAnnotated from '../SpinnerAnnotated';
import GraphComponent from './Graph';

interface GraphWrapperProps {
  pheno?: boolean;
}

const GraphWrapper: React.FC<GraphWrapperProps> = (props) => {
  const viewport = useAppSelector((state) => state.graphLayout.viewport);
  const { data: layout } = layoutApi.useGetRangeLayoutNodesQuery(viewport);
  const f = useAppSelector((state) => state.graphSelection.feature);

  return layout ? (
    <>
      {f ? (
        props.pheno ? (
          <PhenoGraphInfoCard feature={f} />
        ) : (
          <PopuViewInfoCard feature={f} />
        )
      ) : null}
      <GraphComponent layout={layout} />
    </>
  ) : (
    <SpinnerAnnotated message='Loading layout' />
  );
};

export default GraphWrapper;
