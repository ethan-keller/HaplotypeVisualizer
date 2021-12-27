import baseUrl from "./base"

const filePathPrefix = '/files'
const fileBaseUrl = baseUrl + filePathPrefix;

export const getFiles = fileBaseUrl + '/getFiles';