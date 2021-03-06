import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import phenoApi from '../api/pheno';
import { useAppDispatch, useAppSelector } from '../store';
import ErrorCard from './ErrorCard';
import SpinnerAnnotated from './SpinnerAnnotated';
import { reset } from '../slices/pheno';
import { useNavigate } from 'react-router';
import { url as urlWelcomeView } from '../views/WelcomeView';

interface PhenoTableProps {}

const PhenoTable: React.FC<PhenoTableProps> = (props) => {
  const { data: phenosPerSample, isLoading } = phenoApi.useGetPhenosPerSampleQuery();
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sampleFilters = useAppSelector((state) => state.pheno.sampleFilters);
  const phenoFilters = useAppSelector((state) => state.pheno.phenoFilters);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return !isLoading && !phenosPerSample ? (
    <ErrorCard
      message='No phenotype table imported'
      actionTitle='import phenotype table'
      // action will redirect to welcome view (imports) and highlight the pheno table input row
      action={() => navigate(urlWelcomeView, { state: { highlightPhenoTableRow: true } })}
    />
  ) : isLoading ? (
    <SpinnerAnnotated message='Loading the phenotype table' />
  ) : phenosPerSample && phenotypes ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          {phenotypes ? (
            <>
              <th style={{ backgroundColor: 'lightgrey' }}>sample</th>
              {Object.keys(phenotypes).map((key) => (
                <th key={'column' + key}>{key}</th>
              ))}
            </>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {Object.entries(phenosPerSample).map(([key, value], i) => {
          if (sampleFilters.size !== 0 && !sampleFilters.has(key)) return null;

          let filteredOut = true;
          const row = (
            <tr key={'row' + i}>
              <td key={'row' + i}>{key}</td>
              {Object.entries(value).map(([k, v], i) => {
                if (k in phenoFilters && phenoFilters[k].has(v)) {
                  filteredOut = false;
                }
                return <td key={'pheno_value' + i}>{v}</td>;
              })}
            </tr>
          );
          if (Object.keys(phenoFilters).length === 0) filteredOut = false;
          return filteredOut ? null : row;
        })}
      </tbody>
    </Table>
  ) : null;
};

export default PhenoTable;
