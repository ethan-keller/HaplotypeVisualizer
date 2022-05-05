import { ListGroup, ListGroupItem } from 'react-bootstrap';
import gfaApi from '../../../api/gfa';
import phenoApi from '../../../api/pheno';
import { useAppSelector } from '../../../store';
import { GfaFeature } from '../../../types/gfa';
import SpinnerAnnotated from '../../SpinnerAnnotated';

interface PhenoGraphInfoCardSectionProps {
  feature: GfaFeature;
}

const PhenoGraphInfoCardSection: React.FC<PhenoGraphInfoCardSectionProps> = ({ feature }) => {
  const { data: phenotypes } =
    feature.type === 'segment'
      ? phenoApi.useGetPhenotypeQuery(feature.paths)
      : phenoApi.useGetPhenotypeQuery(feature.paths);
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);
  const activePaths = useAppSelector((state) => state.graphSettings.activePaths);
  const { data: paths } = gfaApi.useGetPathsQuery();
  return phenotypes && paths ? (
    <ListGroup>
      {Object.entries(phenotypes).map(([k, pheno], i) => {
        return (
          <ListGroupItem
            key={'phenotype_entry_' + i}
            style={{
              backgroundColor: '#99999920',
              padding: '0.2rem 1rem',
              wordWrap: 'normal',
              overflowX: 'auto',
            }}
          >
            <span>
              <b>{k}</b>:{' '}
              {Object.entries(pheno).map(([sampleIndex, v], j, arr) => {
                const c =
                  activePaths.length === 0
                    ? pathColors[+sampleIndex]
                    : activePaths[+sampleIndex]
                    ? pathColors[+sampleIndex]
                    : '#999999';
                return (
                  <span>
                    <span key={'pheno' + j} style={{ backgroundColor: c + '60' }}>
                      {v}
                    </span>
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
