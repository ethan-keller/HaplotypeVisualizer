import { useState } from 'react';
import { Button, Card, CloseButton, Table } from 'react-bootstrap';
import bookmarksApi from '../../api/bookmarks';
import { getSegmentLength, GfaFeature } from '../../types/gfa';
import { capitalizeFirstLetter, truncateIfLongerThan } from '../../utils/strings';
import BookmarkModal from '../modals/BookmarkModal';
import VerticalSpacer from '../VerticalSpacer';

interface InfoCardProps {
  feature: GfaFeature;
  onClose: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ feature, onClose, children }) => {
  const { data: bookmark } = bookmarksApi.useGetBookmarkQuery({ elem_id: feature.name });
  const [showBookmarkModal, setShowBookmarkModal] = useState<boolean>(false);

  return (
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

          {children}

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

          <CloseButton
            style={{ position: 'absolute', right: 0, top: 0, padding: 15 }}
            onClick={onClose}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default InfoCard;
