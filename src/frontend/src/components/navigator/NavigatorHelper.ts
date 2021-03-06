import * as d3 from 'd3';
import { Position } from '../../types/layout';

class NavigatorHelper {
  static getDimensions = (
    width: number,
    height: number,
    left: number,
    right: number,
    top: number,
    bottom: number,
  ) => {
    const dimensions = {
      width,
      height,
      margin: {
        left,
        right,
        top,
        bottom,
      },
      boundedWidth: 0,
      boundedHeight: 0,
    };
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    return dimensions;
  };

  static getScales = (data: Position[], width: number, height: number) => {
    return {
      xScale: d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.x) as [number, number])
        .range([0, width]),
      yScale: d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)] as [number, number])
        .range([height, 0])
        .nice(),
    };
  };
}

export default NavigatorHelper;
