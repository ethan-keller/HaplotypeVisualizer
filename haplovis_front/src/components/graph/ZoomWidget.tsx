import cytoscape from 'cytoscape';
import { Button } from 'react-bootstrap';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { MdFitScreen } from 'react-icons/md';

interface ZoomWidgetProps {
  cy: cytoscape.Core;
}

const ZoomWidget: React.FC<ZoomWidgetProps> = ({cy}) => {
  const zoomScale = 0.15;
  const currentZoom = cy.zoom();
  return (
    <div>
      <Button style={{ padding: 3 }} className='widget-button' size='sm' variant='secondary' onClick={() => cy.fit()}>
        <MdFitScreen size={25} />
      </Button>
      <Button style={{ padding: 5 }} className='widget-button' size='sm' variant='secondary' onClick={() => cy.zoom(currentZoom + zoomScale)}>
        <BsZoomIn size={20} />
      </Button>
      <Button style={{ padding: 5 }} className='widget-button' size='sm' variant='secondary' onClick={() => cy.zoom(currentZoom - zoomScale)}>
        <BsZoomOut size={20} />
      </Button>
    </div>
  );
};

export default ZoomWidget;
