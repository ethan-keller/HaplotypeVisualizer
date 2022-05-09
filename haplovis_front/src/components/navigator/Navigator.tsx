import { useCallback, useState } from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryLabel,
  createContainer,
  VictoryBrushContainerProps,
  VictoryCursorContainerProps,
} from 'victory';
import { useAppSelector } from '../../store';
import { Position } from '../../types/layout';

interface NavigatorProps {
  densities: Position[];
}

const Navigator: React.FC<NavigatorProps> = (props) => {
  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });
  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);
  const extent = useAppSelector((state) => state.graphLayout.extent);
  const showBrush = useAppSelector((state) => state.globalSettings.navigatorBrush);
  const BrushCursorContainer = createContainer<
    VictoryBrushContainerProps,
    VictoryCursorContainerProps
  >('brush', 'cursor');

  return (
    <div style={{ width: '100%', height: '100%' }} ref={graphRef}>
      <VictoryChart
        padding={{ top: 10 }}
        height={boundingRect.height}
        width={boundingRect.width}
        // have to call navigatorOverlay as function because of Victory bug
        containerComponent={
          showBrush ? (
            <BrushCursorContainer
              brushDimension='x'
              brushDomain={{ x: [extent.xl, extent.xr] }}
              allowDrag={false}
              allowDraw={false}
              allowResize={false}
              brushStyle={{ fill: 'lightgreen', opacity: 0.2 }}
              handleWidth={2}
              handleStyle={{ fill: 'green' }}
              defaultBrushArea='disable'
              cursorDimension='x'
              cursorLabel={(p) => `${Math.round(p.x)}`}
            />
          ) : undefined
        }
      >
        <VictoryArea style={{ data: { fill: '#0d6efd' } }} data={props.densities} />
        <VictoryAxis
          dependentAxis
          tickLabelComponent={<VictoryLabel dx={30} dy={0} style={{ fill: 'black' }} />}
          style={{
            grid: {
              stroke: 'lightgrey',
              strokeDasharray: '3',
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default Navigator;
