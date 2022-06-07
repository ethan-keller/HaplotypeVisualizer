import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TbListSearch } from 'react-icons/tb';
import SearchModal from '../modals/SearchModal';

interface SearchWidgetProps {}

const SearchWidget: React.FC<SearchWidgetProps> = (props) => {
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  return (
    <div>
      <Button
        style={{ padding: 3 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => setShowSearchModal(true)}
      >
        <TbListSearch size={25} />
      </Button>
      <SearchModal show={showSearchModal} onHide={() => setShowSearchModal(false)} />
    </div>
  );
};

export default SearchWidget;
