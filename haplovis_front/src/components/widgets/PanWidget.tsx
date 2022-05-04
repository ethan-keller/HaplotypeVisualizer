import { Button } from 'react-bootstrap';
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Position } from '../../types/layout';

interface PanWidgetProps {
  onPan: (p: Position) => void;
}

const PanWidget: React.FC<PanWidgetProps> = (props) => {
  const singlePan = 50;
  const doublePan = 200;

  const pan = (left: boolean, double: boolean) => {
    props.onPan({
      x: (left ? 1 : -1) * (double ? doublePan : singlePan),
      y: 0,
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
