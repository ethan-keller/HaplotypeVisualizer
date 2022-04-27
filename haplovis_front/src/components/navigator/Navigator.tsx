import { useCallback, useState } from 'react';
import { VictoryChart, VictoryArea, VictoryAxis, VictoryLabel } from 'victory';
import { Position } from '../../types/layout';
import NavigatorOverlay from './NavigatorOverlay';

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

  return (
    <div style={{ width: '100%', height: '100%' }} ref={graphRef}>
      <VictoryChart
        padding={{ top: 10 }}
        height={boundingRect.height}
        width={boundingRect.width}
        // have to call navigatorOverlay as function because of Victory bug
        containerComponent={NavigatorOverlay({}) ?? undefined}
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
