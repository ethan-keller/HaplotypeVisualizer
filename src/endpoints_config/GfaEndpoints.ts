import baseUrl from './base';

const gfaPathPrefix = '/gfa';
export const gfaBaseUrl = baseUrl + gfaPathPrefix;

export const getGfa = gfaBaseUrl + '/';
export const getSegments = gfaBaseUrl + '/segments';
export const getLinks = gfaBaseUrl + '/links';
export const getPaths = gfaBaseUrl + '/paths';
export const getGfaInfo = gfaBaseUrl + '/gfa_info';
export const getGfaHistValues = gfaBaseUrl + '/gfa_hist';
