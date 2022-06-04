import Header from '../components/Header';
import PhenoTable from '../components/PhenoTable';
import PhenoTableSidebar from '../components/sidebar/PhenoTableSidebar';
import '../styles/pheno-table-view.css';

interface PhenoTableViewProps {}

const PhenoTableView: React.FC<PhenoTableViewProps> = (props) => {
  return (
    <>
      <Header />
      <div className='ph-t-container'>
        <div className='ph-t-sidebar'>
          <PhenoTableSidebar />
        </div>

        <div className='ph-t-table'>
          <PhenoTable />
        </div>
      </div>
    </>
  );
};

export const url = '/pheno_table';
export default PhenoTableView;
