import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import phenoApi from '../api/pheno';
import { useAppDispatch, useAppSelector } from '../store';
import ErrorCard from './ErrorCard';
import SpinnerAnnotated from './SpinnerAnnotated';
import { reset } from '../slices/pheno';

interface PhenoTableProps {}

const PhenoTable: React.FC<PhenoTableProps> = (props) => {
  const { data: phenosPerSample, isLoading } = phenoApi.useGetPhenosPerSampleQuery();
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const dispatch = useAppDispatch();

  const sampleFilters = useAppSelector((state) => state.pheno.sampleFilters);
  const phenoFilters = useAppSelector((state) => state.pheno.phenoFilters);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return !isLoading && !phenosPerSample ? (
    <ErrorCard message='No phenotype table imported' />
  ) : isLoading ? (
    <SpinnerAnnotated message='Loading the phenotype table' />
  ) : phenosPerSample && phenotypes ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          {phenotypes ? (
            <>
              <th>sample</th>
              {Object.keys(phenotypes).map((key) => (
                <th key={'column' + key}>{key}</th>
              ))}
            </>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {Object.entries(phenosPerSample).map(([key, value], i) => {
          if (sampleFilters.includes(key)) return null;

          let filteredOut = false;
          const row = (
            <tr key={'row' + i}>
              <td key={'row' + i}>{key}</td>
              {/* Not clean at all */}
              {Object.entries(value).map(([k, v], i) => {
                if (k in phenoFilters && phenoFilters[k].includes(v)) {
                  filteredOut = true;
                }
                return <td key={'pheno_value' + i}>{v}</td>;
              })}
            </tr>
          );
          return filteredOut ? null : row;
        })}
      </tbody>
    </Table>
  ) : null;
};

export default PhenoTable;
