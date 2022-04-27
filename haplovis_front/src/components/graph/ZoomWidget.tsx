import { Button } from 'react-bootstrap';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { MdFitScreen } from 'react-icons/md';

interface ZoomWidgetProps {
  zoom: number;
  onZoom: (newZoom: number) => void;
  onFit: () => void;
}

const ZoomWidget: React.FC<ZoomWidgetProps> = (props) => {
  const zoomScale = 0.15;
  return (
    <div>
      <Button
        style={{ padding: 3 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onFit()}
      >
        <MdFitScreen size={25} />
      </Button>
      <Button
        style={{ padding: 5 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onZoom(props.zoom + zoomScale)}
      >
        <BsZoomIn size={20} />
      </Button>
      <Button
        style={{ padding: 5 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onZoom(props.zoom - zoomScale)}
      >
        <BsZoomOut size={20} />
      </Button>
    </div>
  );
};

export default ZoomWidget;
