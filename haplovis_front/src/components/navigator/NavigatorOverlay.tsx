import {
  createContainer,
  VictoryBrushContainer,
  VictoryBrushContainerProps,
  VictoryCursorContainer,
  VictoryCursorContainerProps,
} from 'victory';
import { useAppSelector } from '../../store';

interface NavigatorOverlayProps {}

const NavigatorOverlay: React.FC<NavigatorOverlayProps> = (props) => {
  const extent = useAppSelector((state) => state.graphLayout.extent);
  const f = useAppSelector((state) => state.globalSettings.navigatorDownSampleFactor)
  const BrushCursorContainer = createContainer<
    VictoryBrushContainerProps,
    VictoryCursorContainerProps
  >('brush', 'cursor');

  return (
    <VictoryCursorContainer
      // brushDimension='x'
      // brushDomain={{ x: [extent.xl, extent.xr] }}
      // allowDrag={false}
      // allowDraw={false}
      // allowResize={false}
      // brushStyle={{ fill: 'lightgreen', opacity: 0.2 }}
      // handleWidth={2}
      // handleStyle={{ fill: 'green' }}
      // defaultBrushArea='disable'
      cursorDimension='x'
      cursorLabel={(p) => `${Math.round(p.x)}`}
    />
  );
};

export default NavigatorOverlay;
