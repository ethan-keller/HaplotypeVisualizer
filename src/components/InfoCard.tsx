import { Button, Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { useAppSelector } from '../store';
import { getSegmentLength, GfaFeature } from '../types/gfa';
import { capitalizeFirstLetter, truncateIfLongerThan } from '../utils/strings';
import VerticalSpacer from './VerticalSpacer';

interface InfoCardProps {
  data: GfaFeature;
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const f = props.data;
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);
  const activePaths = useAppSelector((state) => state.graphSettings.activePaths);
  return (
    <Card style={{ border: 0 }}>
      <Card.Body>
        <Card.Title>{f.name}</Card.Title>
        <Card.Subtitle className='mb-2- text-muted'>{capitalizeFirstLetter(f.type)}</Card.Subtitle>

        <VerticalSpacer space={5} />

        {f.type === 'segment' ? (
          <>
            <Card.Text style={{ fontWeight: 100 }}>
              {'length: ' + getSegmentLength(f)}
              <br />
              {'sequence: ' + truncateIfLongerThan(f.sequence, 20)}
            </Card.Text>
          </>
        ) : null}

        <VerticalSpacer space={10} />

        <Card.Subtitle className='mb-2 text-muted'>Paths</Card.Subtitle>
        <Card.Text>
          <b>{f.paths.length}</b> paths through this {f.type}
        </Card.Text>
        <ListGroup>
          {f.paths.map((path, i) => {
            const c =
              activePaths.length === 0
                ? pathColors[path.index]
                : activePaths[path.index]
                ? pathColors[path.index]
                : '#999999';
            return (
              <ListGroupItem key={'path_' + i} style={{ backgroundColor: c + '60' }}>
                {path.name}
              </ListGroupItem>
            );
          })}
        </ListGroup>

        {f.optionals ? (
          <Table className='align-middle'>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(f.optionals).map(([k, v], i) => (
                <tr key={'tag_entry_' + i}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}

        <VerticalSpacer space={10} />
        
        <Button>Bookmark</Button>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;

// import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
// import {GFAFeature} from "./graph";
// import {capitalizeFirstLetter} from "../utilities";

// export function InfoCard({data}: {
//   data: GFAFeature
// }) {
//   return (
//     <div className={"infoCard"}>
//       <Card>
//         <Card.Body>
//           <Card.Title>{data.name}</Card.Title>
//           <Card.Subtitle className={"mb-2 text-muted"}>{capitalizeFirstLetter(data.type)}</Card.Subtitle>
//           {data.type === "segment" ?
//             (<>
//               <Card.Text>
//                 {"Length: " + data.length}
//                 <br/>
//                 {"Sequence: " + data.sequence.substring(0, 20) + "..."}
//               </Card.Text>
//               <Button>JBrowse</Button></>)
//             :
//             (<>
//               <Card.Text as={"div"}>
//                 <b>{data.paths.length}</b> path(s) through this link
//                 <br/>
//                 <br/>
//                 {data.paths.length !== 0 ?
//                   <>
//                     <Card.Subtitle className={"mb-2 text-muted"}>Paths</Card.Subtitle>
//                     <ListGroup>
//                       {data.paths.map(path => (
//                         <ListGroupItem>{path.pathName}</ListGroupItem>
//                       ))}
//                     </ListGroup>
//                   </>
//                   : null}
//               </Card.Text>
//             </>)
//           }
//         </Card.Body>
//       </Card>
//     </div>

//   );
// }
