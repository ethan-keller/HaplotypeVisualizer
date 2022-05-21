import React, { useEffect, useCallback, useState, useRef } from 'react';
import * as d3 from 'd3';
import { BrushBehavior } from 'd3-brush';
import NavigatorHelper from './NavigatorHelper';
import { Dimensions } from '../../types/navigator';
import { Position } from '../../types/layout';

interface NavigatorBrushProps {
  dimensions: Dimensions;
  data: Position[];
  onBrushUpdateData: (value: number[]) => void;
  fill: string;
  stroke: string;
  focusHeight: number;
}

const NavigatorBrush: React.FC<NavigatorBrushProps> = (props) => {
  const [loaded, setLoaded] = useState(false);
  const brush = useRef() as { current: BrushBehavior<unknown> };

  const memoizedDrawCallback = useCallback(() => {
    const scales = NavigatorHelper.getScales(
      props.data,
      props.dimensions.boundedWidth,
      props.focusHeight,
    );
    const helper = new NavigatorHelper();

    // draw chart
    const linesGenerator = d3
      .area()
      .x((d) => scales.xScale(helper.xAccessor({ x: d[0], y: d[1] })))
      .y0(scales.yScale(0))
      .y1((d) => {
        return scales.yScale(d[1]);
      });

    d3.select('#brush-path')
      .attr('fill', props.fill)
      .attr('stroke', props.stroke)
      .attr('d', linesGenerator(props.data.map((pos) => [pos.x, pos.y])));

    brush.current = d3
      .brushX()
      .extent([
        [0, 0.5],
        [
          props.dimensions.width - props.dimensions.margin.right - props.dimensions.margin.left,
          props.focusHeight,
        ],
      ])
      .on('brush', brushed)
      .on('end', brushEnded);

    const lastX = scales.xScale.domain()[1];
    const lastLocationToX = scales.xScale(lastX);
    const defaultSelection = [lastLocationToX - 100, lastLocationToX];

    const gBrush = d3
      .select('#group-brush')
      // @ts-ignore
      .call(brush.current)
      // @ts-ignore
      .call(brush.current.move, defaultSelection);

    // brush handlers
    function brushed(event: { selection: number[] }) {
      if (event.selection) {
        const value = [
          scales.xScale.invert(event.selection[0]),
          scales.xScale.invert(event.selection[1]),
        ];
        props.onBrushUpdateData(value);
      }
    }
    function brushEnded(event: { selection: [] }) {
      if (!event.selection) {
        // @ts-ignore
        gBrush.call(brush.current.move, defaultSelection);
      }
    }

    // Peripherals
    // yAxis
    const brushBounds = d3.select('#brush-bounds');
    const yAxisTicks = scales.yScale.ticks().filter((tick) => Number.isInteger(tick));
    const yAxisGenerator = d3
      .axisLeft(scales.yScale)
      .tickValues(yAxisTicks)
      .tickFormat(d3.format('d'));
    //@ts-ignore
    brushBounds.select('#y-axis-brush').call(yAxisGenerator);
  }, [props]);

  const memoizedUpdateCallback = useCallback(() => {
    d3.selectAll('#x-axis-brush').selectAll('*').remove();
    d3.selectAll('#brush-path').selectAll('*').remove();
  }, []);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      memoizedDrawCallback();
    }
  }, [loaded, memoizedDrawCallback]);

  useEffect(() => {
    memoizedUpdateCallback();
    memoizedDrawCallback();
  }, [props.dimensions.height, props.dimensions.width]);

  return (
    <div id='div'>
      <svg
        id='brush-wrapper'
        width={props.dimensions.width}
        height={props.dimensions.height}
        style={{ display: 'block' }}
      >
        <g
          id='brush-bounds'
          style={{
            transform: `translate(${props.dimensions.margin.left}px, ${props.dimensions.margin.top}px)`,
          }}
        >
          <path id='brush-path' />
          <g id='y-axis-brush' />
          <g id='group-brush' />
        </g>
      </svg>
    </div>
  );
};

export default NavigatorBrush;
