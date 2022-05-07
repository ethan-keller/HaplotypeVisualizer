import { Button } from 'react-bootstrap';
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';
import { useAppSelector } from '../../store';
import { Position } from '../../types/layout';

interface PanWidgetProps {
  onPan: (p: Position) => void;
}

const PanWidget: React.FC<PanWidgetProps> = (props) => {
  const singlePan = useAppSelector((state) => state.graphSettings.panSensitivity);
  const doublePan = 2 * singlePan;

  const pan = (left: boolean, double: boolean, up?: boolean) => {
    props.onPan({
      x: up === undefined ? (left ? 1 : -1) * (double ? doublePan : singlePan) : 0,
      y: up === undefined ? 0 : (up ? 1 : -1) * singlePan,
    });
  };

  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Button
        className={'widget-button'}
        size='sm'
        variant='secondary'
        onClick={() => pan(true, true)}
      >
        <FaAngleDoubleLeft />
      </Button>
      <Button
        className={'widget-button'}
        size='sm'
        variant='secondary'
        onClick={() => pan(true, false)}
      >
        <FaAngleLeft />
      </Button>
      <div style={{ display: 'inline-block', width: 5 }} />
      <Button
        className={'widget-button'}
        size='sm'
        variant='secondary'
        onClick={() => pan(false, false, true)}
      >
        <FaAngleUp />
      </Button>
      <Button
        className={'widget-button'}
        size='sm'
        variant='secondary'
        onClick={() => pan(false, false, false)}
      >
        <FaAngleDown />
      </Button>
      <div style={{ display: 'inline-block', width: 5 }} />
      <Button
        className={'widget-button'}
        size='sm'
        variant='secondary'
        onClick={() => pan(false, false)}
      >
        <FaAngleRight />
      </Button>
      <Button
        className={'widget-button'}
        size='sm'
        variant='secondary'
        onClick={() => pan(false, true)}
      >
        <FaAngleDoubleRight />
      </Button>
    </div>
  );
};

export default PanWidget;
