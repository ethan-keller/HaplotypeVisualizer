import { useCallback, useState } from 'react';
import {
  VictoryChart,
  VictoryBrushContainer,
  VictoryArea,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import { useAppSelector } from '../../store';
import { Position } from '../../types/layout';

interface NavigatorProps {
  data: Position[];
}

const Navigator: React.FC<NavigatorProps> = (props) => {
  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });
  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);
  const extent = useAppSelector((state) => state.graphLayout.extent);
  return (
    <div style={{ width: '100%', height: '100%' }} ref={graphRef}>
      <VictoryChart
        padding={{ top: 10 }}
        width={boundingRect.width}
        containerComponent={
          <VictoryBrushContainer
            brushDimension='x'
            brushDomain={{ x: [extent.xl, extent.xr] }}
            allowDrag={false}
            allowDraw={false}
            allowResize={false}
          />
        }
      >
        <VictoryArea style={{ data: { fill: '#0d6efd' } }} data={props.data} />
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
