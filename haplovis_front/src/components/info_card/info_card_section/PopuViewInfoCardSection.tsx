import { ListGroup, ListGroupItem } from 'react-bootstrap';
import gfaApi from '../../../api/gfa';
import { useAppSelector } from '../../../store';
import { GfaFeature } from '../../../types/gfa';
import SpinnerAnnotated from '../../SpinnerAnnotated';

interface PopuViewInfoCardSectionProps {
  feature: GfaFeature;
}

const PopuViewInfoCardSection: React.FC<PopuViewInfoCardSectionProps> = ({ feature }) => {
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);
  const activePaths = useAppSelector((state) => state.graphSettings.activePaths);
  const { data: paths } = gfaApi.useGetPathsQuery();
  return (
    <ListGroup>
      {paths ? (
        feature.paths.map((pathIndex, i) => {
          const path = paths[pathIndex];
          const c =
            activePaths.length === 0
              ? pathColors[path.index]
              : activePaths[path.index]
              ? pathColors[path.index]
              : '#999999';
          return (
            <ListGroupItem
              key={'path_' + i}
              style={{ backgroundColor: c + '60', padding: '0.2rem 1rem' }}
            >
              {path.name}
            </ListGroupItem>
          );
        })
      ) : (
        <SpinnerAnnotated message='Loading path info' />
      )}
    </ListGroup>
  );
};

export default PopuViewInfoCardSection;
