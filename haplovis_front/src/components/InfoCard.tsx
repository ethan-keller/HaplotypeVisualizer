import { useState } from 'react';
import { Button, Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import bookmarksApi from '../api/bookmarks';
import gfaApi from '../api/gfa';
import { useAppSelector } from '../store';
import { getSegmentLength } from '../types/gfa';
import { FeatureSelection } from '../types/graph';
import { capitalizeFirstLetter, truncateIfLongerThan } from '../utils/strings';
import BookmarkModal from './modals/BookmarkModal';
import SpinnerAnnotated from './SpinnerAnnotated';
import VerticalSpacer from './VerticalSpacer';

interface InfoCardProps {
  feature: FeatureSelection;
  showPheno: boolean;
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const pathColors = useAppSelector((state) => state.graphSettings.pathColors);
  const activePaths = useAppSelector((state) => state.graphSettings.activePaths);
  const { data: paths } = gfaApi.useGetPathsQuery();
  const { data: feature } =
    props.feature.type === 'segment'
      ? gfaApi.useGetSegmentQuery({ segment_id: props.feature.name })
      : gfaApi.useGetLinkQuery({ link_id: props.feature.name });
  const { data: bookmark } = bookmarksApi.useGetBookmarkQuery({ elem_id: props.feature.name });

  const [showBookmarkModal, setShowBookmarkModal] = useState<boolean>(false);
  return feature ? (
    <div className='info-card'>
      <Card style={{ border: 0 }}>
        <Card.Body>
          <Card.Title>{feature.name}</Card.Title>
          <Card.Subtitle className='mb-2- text-muted'>
            {capitalizeFirstLetter(feature.type)}
          </Card.Subtitle>

          <VerticalSpacer space={5} />

          {feature.type === 'segment' ? (
            <>
              <Card.Text style={{ fontWeight: 100 }}>
                {'length: ' + getSegmentLength(feature)}
                <br />
                {'sequence: ' + truncateIfLongerThan(feature.sequence, 20)}
              </Card.Text>
            </>
          ) : null}

          <VerticalSpacer space={10} />

          <Card.Subtitle className='mb-2 text-muted'>Paths</Card.Subtitle>
          <Card.Text>
            <b>{feature.paths.length}</b> paths through this {feature.type}
          </Card.Text>
          <ListGroup>
            {paths
              ? feature.paths.map((pathIndex, i) => {
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
              : null}
          </ListGroup>

          {feature.optionals ? (
            <Table className='align-middle'>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(feature.optionals).map(([k, v], i) => (
                  <tr key={'tag_entry_' + i}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}

          <VerticalSpacer space={10} />

          <Button onClick={() => setShowBookmarkModal(true)} size='sm'>
            Bookmark
          </Button>
          <BookmarkModal
            elem={feature}
            show={showBookmarkModal}
            onHide={() => setShowBookmarkModal(false)}
          />

          {bookmark ? <div className='bookmarked'>Bookmarked ✓</div> : null}
        </Card.Body>
      </Card>
    </div>
  ) : (
    <div className='info-card'>
      <SpinnerAnnotated message='Loading info card' />
    </div>
  );
};

export default InfoCard;
