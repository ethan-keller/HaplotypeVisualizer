import { Button } from 'react-bootstrap';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { MdFitScreen } from 'react-icons/md';
import { FaBullseye } from 'react-icons/fa';
import { useAppSelector } from '../../store';
import ZoomIndicator from './ZoomIndicator';

interface ZoomWidgetProps {
  onZoom: (newZoom: number) => void;
  onFit: () => void;
  onCenter: () => void;
}

const ZoomWidget: React.FC<ZoomWidgetProps> = (props) => {
  const zoom = useAppSelector((state) => state.graphLayout.zoom);
  const zoomScale = useAppSelector((state) => state.globalSettings.zoomScale);
  return (
    <div>
      <Button
        style={{ padding: 3 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onFit()}
      >
        <MdFitScreen size={24} />
      </Button>
      <Button
        style={{ padding: 3 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onCenter()}
      >
        <FaBullseye size={24} />
      </Button>
      <div className='separator' />
      <Button
        style={{ padding: 5 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onZoom(zoom + zoomScale)}
      >
        <BsZoomIn size={20} />
      </Button>
      <ZoomIndicator />
      <Button
        style={{ padding: 5 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        onClick={() => props.onZoom(zoom - zoomScale)}
      >
        <BsZoomOut size={20} />
      </Button>
    </div>
  );
};

export default ZoomWidget;
