import cytoscape from 'cytoscape';
import { Button } from 'react-bootstrap';
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PanWidgetProps {
  cy: cytoscape.Core;
}

const PanWidget: React.FC<PanWidgetProps> = ({ cy }) => {
  const singlePan = 50;
  const doublePan = 200;

  const pan = (left: boolean, double: boolean) => {
    const currentPanPos = cy.pan();
    cy.pan({
      x: currentPanPos.x + (left ? 1 : -1) * (double ? doublePan : singlePan),
      y: currentPanPos.y,
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
