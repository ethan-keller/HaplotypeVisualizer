import baseUrl from './base';

const layoutPathPrefix = '/layout';
export const layoutBaseUrl = baseUrl + layoutPathPrefix;

export const prepareLayout = layoutBaseUrl + '/';
export const getNodePositions = layoutBaseUrl + '/positions';
export const getNodeBounds = layoutBaseUrl + '/bounds';
export const getDensities = layoutBaseUrl + '/density';
export const areBoundsReady = layoutBaseUrl + '/bounds_ready';
