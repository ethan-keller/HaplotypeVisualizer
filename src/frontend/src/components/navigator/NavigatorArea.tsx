import React, { useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import NavigatorHelper from './NavigatorHelper';
import { Dimensions } from '../../types/navigator';
import { Position } from '../../types/layout';

interface NavigatorAreaProps {
  dimensions: Dimensions;
  data: Position[];
}

const NavigatorArea: React.FC<NavigatorAreaProps> = (props) => {
  const memoizedUpdateCallback = useCallback(() => {
    const scales = NavigatorHelper.getScales(
      props.data,
      props.dimensions.boundedWidth,
      props.dimensions.boundedHeight,
    );
    const bounds = d3.select('#bounds');

    // Chart
    // draw chart
    const linesGenerator = d3
      .area()
      .x((d) => scales.xScale(d[0]))
      .y0(scales.yScale(0))
      .y1((d) => scales.yScale(d[1]));

    d3.select('#path')
      .attr('fill', '#0d6efd')
      .attr('d', linesGenerator(props.data.map((pos) => [pos.x, pos.y])));

    // Peripherals
    // yAxis
    const yAxisTicks = scales.yScale.ticks().filter((tick) => Number.isInteger(tick));
    const yAxisGenerator = d3
      .axisLeft(scales.yScale)
      .tickValues(yAxisTicks)
      .tickFormat(d3.format('d'));
    //@ts-ignore
    bounds.select('#y-axis').call(yAxisGenerator);
  }, [props.data, props.dimensions.boundedHeight, props.dimensions.boundedWidth]);

  useEffect(() => {
    memoizedUpdateCallback();
  }, [memoizedUpdateCallback, props.dimensions.height, props.dimensions.width]);

  return (
    <div id='div'>
      <svg id='wrapper' width={props.dimensions.width} height={props.dimensions.height}>
        <g
          id='bounds'
          style={{
            transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)`,
          }}
        >
          <path id='path' />
          <g id='y-axis' />
        </g>
      </svg>
    </div>
  );
};

export default NavigatorArea;
