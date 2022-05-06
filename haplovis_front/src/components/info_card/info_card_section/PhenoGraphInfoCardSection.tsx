import { ListGroup, ListGroupItem } from 'react-bootstrap';
import gfaApi from '../../../api/gfa';
import phenoApi from '../../../api/pheno';
import { useAppSelector } from '../../../store';
import { GfaFeature } from '../../../types/gfa';
import ErrorCard from '../../ErrorCard';
import SpinnerAnnotated from '../../SpinnerAnnotated';

interface PhenoGraphInfoCardSectionProps {
  feature: GfaFeature;
}

const PhenoGraphInfoCardSection: React.FC<PhenoGraphInfoCardSectionProps> = ({ feature }) => {
  const { data: phenotypes, isError: noPheno } = phenoApi.useGetPhenosPerSampleQuery();
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);
  const activePaths = useAppSelector((state) => state.graphSettings.activePaths);
  const { data: paths } = gfaApi.useGetPathsQuery();
  return noPheno ? (
    <ErrorCard message='No phenotype info' />
  ) : phenotypes && paths ? (
    <ListGroup>
      {feature.paths.map((pathName, i) => {
        const pheno = phenotypes[pathName];
        const sampleIndex = paths[pathName].index;
        const c =
          activePaths.length === 0
            ? pathColors[sampleIndex]
            : activePaths[sampleIndex]
            ? pathColors[sampleIndex]
            : '#999999';

        return (
          <ListGroupItem
            style={{
              backgroundColor: c + '60',
              padding: '0.2rem 1rem',
              wordWrap: 'normal',
              overflowX: 'auto',
            }}
            key={i}
          >
            <span>
              <b>{pathName}</b>:{' '}
              {Object.entries(pheno).map(([_, v], j, arr) => {
                return (
                  <span key={j}>
                    <span>{v}</span>
                    {j === arr.length - 1 ? null : ', '}
                  </span>
                );
              })}
            </span>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  ) : (
    <SpinnerAnnotated message='Loading phenotype info' />
  );
};

export default PhenoGraphInfoCardSection;
