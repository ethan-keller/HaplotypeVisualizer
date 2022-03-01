import { Table } from 'react-bootstrap';
import phenoApi from '../api/pheno';
import SpinnerAnnotated from './SpinnerAnnotated';

interface PhenoTableProps {}

const PhenoTable: React.FC<PhenoTableProps> = (props) => {
  const { data: phenoTable, isLoading } = phenoApi.useGetPhenoTableQuery();

  return isLoading ? (
    <SpinnerAnnotated message='Loading the phenotype table' />
  ) : phenoTable ? (
    <Table striped bordered hover >
      <thead>
        <tr>
          {phenoTable.phenotypes[0]
            ? Object.keys(phenoTable.phenotypes[0]).map((key) => (
                <th key={'column' + key}>{key}</th>
              ))
            : null}
        </tr>
      </thead>
      <tbody>
        {phenoTable.phenotypes.map((record, i) => {
          return (
            <tr key={'row' + i}>
              {Object.values(record).map((v, i) => {
                return <td key={'value' + i}>{v}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : null;
};

export default PhenoTable;
