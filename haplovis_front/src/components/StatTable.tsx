import { Table } from 'react-bootstrap';

interface StatTableProps {
  tableEntries: Record<string, string>;
}

const StatTable: React.FC<StatTableProps> = (props) => {
  return (
    <Table style={{ fontWeight: 100 }} borderless size='sm'>
      <tbody>
        {Object.entries(props.tableEntries).map(([k, v], i) => {
          return (
            <tr className="d-flex" key={'row_' + i}>
              <td className='col-7'>{k}</td>
              <td>{v}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StatTable;
