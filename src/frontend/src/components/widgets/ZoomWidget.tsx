import { Button } from 'react-bootstrap';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { AiOutlineVerticalAlignMiddle } from 'react-icons/ai';
import { useAppSelector } from '../../store';
import ZoomIndicator from './ZoomIndicator';

interface ZoomWidgetProps {
  onZoom: (newZoom: number) => void;
  onVerticalCenter: () => void;
  isZoomLimit: (zoomIn: boolean) => boolean;
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
        onClick={() => props.onVerticalCenter()}
      >
        <AiOutlineVerticalAlignMiddle size={24} />
      </Button>
      <div className='separator' />
      <Button
        style={{ padding: 5 }}
        className='widget-button'
        size='sm'
        variant='secondary'
        disabled={props.isZoomLimit(true)}
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
        disabled={props.isZoomLimit(false)}
        onClick={() => props.onZoom(zoom - zoomScale)}
      >
        <BsZoomOut size={20} />
      </Button>
    </div>
  );
};

export default ZoomWidget;
