import { useAppSelector } from '../../store';

interface ZoomIndicatorProps {}

const ZoomIndicator: React.FC<ZoomIndicatorProps> = (props) => {
  const zoom = useAppSelector((state) => state.graphLayout.zoom);
  return (
    <span
      style={{
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      {zoom.toFixed(2)}x
    </span>
  );
};

export default ZoomIndicator;
