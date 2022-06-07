import layoutApi from '../../api/layout';
import { updateFeature } from '../../slices/graphSelection';
import { useAppDispatch, useAppSelector } from '../../store';
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
  const dispatch = useAppDispatch();
  const phenoFilteredSegments = useAppSelector((state) => state.pheno.phenoFilteredSegments);
  const sampleFilteredSegments = useAppSelector((state) => state.pheno.sampleFilteredSegments);

  const onClose = () => {
    dispatch(updateFeature(undefined));
  };

  return layout ? (
    <>
      {f ? (
        props.pheno ? (
          <PhenoGraphInfoCard feature={f} onClose={onClose} />
        ) : (
          <PopuViewInfoCard feature={f} onClose={onClose} />
        )
      ) : null}
      {props.pheno ? (
        <GraphComponent
          layout={layout}
          pheno={props.pheno}
          sampleFilteredSegments={sampleFilteredSegments}
          phenoFilteredSegments={phenoFilteredSegments}
        />
      ) : (
        <GraphComponent layout={layout} />
      )}
    </>
  ) : (
    <SpinnerAnnotated message='Loading layout' />
  );
};

export default GraphWrapper;
