import React, { useEffect, useRef, useState } from 'react';
import NavigatorArea from './NavigatorArea';
import NavigatorHelper from './NavigatorHelper';
import NavigatorBrush from './NavigatorBrush';
import { Position } from '../../types/layout';
import { Dimensions } from '../../types/navigator';
import SpinnerAnnotated from '../SpinnerAnnotated';
import { useAppSelector } from '../../store';

interface NavigatorProps {
  data: Position[];
  downSampleFactor: number;
}

// https://medium.com/react-courses/area-chart-using-react-js-d3-js-typescript-with-the-help-of-d3-brush-for-interaction-c66d11af14c3

const Navigator: React.FC<NavigatorProps> = ({ data, downSampleFactor }) => {
  const [brushedData, setBrushedData] = useState<Position[]>([{ x: 0, y: 0 }]);
  const [boundingRect, setBoundingRect] = useState<{ width: number; height: number }>({
    width: 1000,
    height: 100,
  });
  const navigatorRef = useRef<HTMLDivElement>(null);
  const [brushDimensions, setBrushDimensions] = useState<Dimensions>();
  const [areaDimensions, setAreaDimensions] = useState<Dimensions>();
  const navigatorTwoViews = useAppSelector((state) => state.globalSettings.navigatorTwoViews);

  const [first, setFirst] = useState<boolean>(false);

  useEffect(() => {
    if (navigatorRef.current && !first) {
      setBoundingRect(navigatorRef.current.getBoundingClientRect());
      setFirst(true);
    }
  }, [navigatorRef.current]);

  useEffect(() => {
    if (navigatorTwoViews) {
      setAreaDimensions(
        NavigatorHelper.getDimensions(boundingRect.width, boundingRect.height * 0.6, 20, 5, 5, 5),
      );
      setBrushDimensions(
        NavigatorHelper.getDimensions(boundingRect.width, boundingRect.height * 0.4, 20, 5, 5, 5),
      );
    } else {
      setAreaDimensions(undefined);
      setBrushDimensions(
        NavigatorHelper.getDimensions(boundingRect.width, boundingRect.height, 20, 5, 5, 5),
      );
    }
  }, [navigatorRef.current, navigatorTwoViews]);

  const onBrushUpdateData = (values: number[]) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      const check = data[i].x;
      if (check >= values[0] && check <= values[1]) {
        newData.push(data[i]);
      }
    }
    if (newData.length > 1 && newData[0].x !== brushedData[0].x) {
      setBrushedData(newData);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }} ref={navigatorRef}>
      {data.length > 1 && areaDimensions ? (
        <NavigatorArea dimensions={areaDimensions} data={brushedData} />
      ) : null}
      {data.length > 1 && brushDimensions ? (
        <NavigatorBrush
          dimensions={brushDimensions}
          data={data}
          downSampleFactor={downSampleFactor}
          onBrushUpdateData={onBrushUpdateData}
          focusHeight={brushDimensions.boundedHeight}
        />
      ) : (
        <SpinnerAnnotated message='Loading navigator' />
      )}
    </div>
  );
};

export default Navigator;
