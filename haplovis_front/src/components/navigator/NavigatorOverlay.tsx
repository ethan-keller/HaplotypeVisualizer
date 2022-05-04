import { createContainer, VictoryBrushContainerProps, VictoryCursorContainerProps } from 'victory';
import { updateExtent } from '../../slices/graphLayout';
import { useAppDispatch, useAppSelector } from '../../store';

interface NavigatorOverlayProps {}

const NavigatorOverlay: React.FC<NavigatorOverlayProps> = (props) => {
  const extent = useAppSelector((state) => state.graphLayout.extent);
  const dispatch = useAppDispatch();
  const BrushCursorContainer = createContainer<
    VictoryBrushContainerProps,
    VictoryCursorContainerProps
  >('brush', 'cursor');

  return (
    <BrushCursorContainer
      brushDimension='x'
      brushDomain={{ x: [extent.xl, extent.xr] }}
      allowDrag={false}
      onBrushDomainChangeEnd={(domain) =>
        // dispatch(updateExtent({ xl: domain.x[0] as number, xr: domain.x[1] as number }))
        null
      }
      brushStyle={{ fill: 'lightgreen', opacity: 0.2 }}
      handleWidth={2}
      handleStyle={{ fill: 'green' }}
      defaultBrushArea='disable'
      cursorDimension='x'
      cursorLabel={(p) => `${Math.round(p.x)}`}
    />
  );
};

export default NavigatorOverlay;
