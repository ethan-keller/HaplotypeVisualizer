import baseUrl from "./base"

const gfaPathPrefix = '/gfa'
const gfaBaseUrl = baseUrl + gfaPathPrefix;

export const getSegments = gfaBaseUrl + '/segments'
export const getLinks = gfaBaseUrl + '/links';
export const getPaths = gfaBaseUrl + '/paths'