import Header from '../components/Header';
import PhenoTableSidebar from '../components/sidebar/PhenoTableSidebar';
// import '../styles/pheno-table-view.css';

interface PhenoTableViewProps {}

const PhenoTableView: React.FC<PhenoTableViewProps> = (props) => {
  return (
    <>
      <Header />
      <div className='container'>
        <PhenoTableSidebar />
        <div className='table' style={{backgroundColor: '#c7edb4'}}>Big table with phenotype-sample matrix</div>
      </div>
    </>
  );
};

export const url = '/pheno_table';
export default PhenoTableView;
