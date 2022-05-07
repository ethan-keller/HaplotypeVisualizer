import { Button } from 'react-bootstrap';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { MdFitScreen } from 'react-icons/md';
import { FaBullseye } from 'react-icons/fa';
import { useAppSelector } from '../../store';

interface ZoomWidgetProps {
  zoom: number;
  onZoom: (newZoom: number) => void;
  onFit: () => void;
  onCenter: () => void;
}

const ZoomWidget: React.FC<ZoomWidgetProps> = (props) => {
  const zoomScale = useAppSelector((state) => state.graphSettings.zoomScale);
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
